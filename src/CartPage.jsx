import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import MirrorPreview from './MirrorPreview'

const THUMB_W = 84
const DESIGN_W = 360
const THUMB_SCALE = THUMB_W / DESIGN_W

function Thumb({ item }) {
  return (
    <div style={{ position: 'relative', width: THUMB_W + 'px', height: '104px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, background: item.dark ? '#000' : '#fff', boxShadow: `0 0 0 1px rgba(0,0,0,0.06)${item.ledHex ? `, 0 8px 18px -8px ${item.ledHex}cc` : ''}` }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: DESIGN_W + 'px', transform: `scale(${THUMB_SCALE})`, transformOrigin: 'top left' }}>
        <MirrorPreview {...item} ledHex={item.ledHex} />
      </div>
    </div>
  )
}

function QtyStepper({ qty, onDec, onInc }) {
  const btn = 'w-8 h-8 flex items-center justify-center text-[16px] leading-none text-black/60 hover:text-black transition-colors'
  return (
    <div className="inline-flex items-center rounded-full border border-black/12">
      <button type="button" onClick={onDec} className={btn} aria-label="Scade">-</button>
      <span className="w-6 text-center text-[13px] font-medium">{qty}</span>
      <button type="button" onClick={onInc} className={btn} aria-label="Adauga">+</button>
    </div>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQty, clear, total, count } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', postcode: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const goConfigure = () => { navigate('/'); setTimeout(() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' }), 80) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!items.length) return
    setSending(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://halomirrors.local'
      const response = await fetch(apiUrl + '/wp-json/halo/v1/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, total, items }),
      })
      if (response.ok) {
        clear()
        setSent(true)
      } else {
        alert('A aparut o eroare. Incearca din nou.')
      }
    } catch (err) {
      console.error('Eroare detaliata:', err)
      alert('Nu am putut trimite comanda. Verifica conexiunea.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-6 pt-32 pb-28 text-center">
        <div className="spectrum-line mx-auto" style={{ width: '44px', marginBottom: '22px' }} />
        <h1 className="font-display text-3xl font-medium mb-3">Comanda a fost trimisa</h1>
        <p className="text-[#17181A]/60 text-[15px] mb-8">Te contactam in cel mult 24h pentru confirmare si detalii de livrare.</p>
        <button onClick={() => navigate('/')} className="cta-glow inline-block bg-[#17181A] text-white rounded-full px-7 py-3.5 text-[14px] font-medium">Inapoi la site</button>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="max-w-xl mx-auto px-6 pt-32 pb-28 text-center">
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', margin: '0 auto 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#17181A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
        </div>
        <h1 className="font-display text-3xl font-medium mb-3">Cosul tau e gol</h1>
        <p className="text-[#17181A]/60 text-[15px] mb-8">Configureaza-ti oglinda si adaug-o in cos ca sa continui.</p>
        <button onClick={goConfigure} className="cta-glow inline-block bg-[#17181A] text-white rounded-full px-7 py-3.5 text-[14px] font-medium">Configureaza o oglinda</button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-28 pb-24">
      <div className="mb-8">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span className="spectrum-line" style={{ width: '30px' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(23,24,26,0.5)', fontWeight: 500 }}>Cosul tau</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-medium">{count} {count === 1 ? 'oglinda' : 'oglinzi'} in cos</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Items */}
        <div>
          <div className="rounded-2xl border border-black/10 bg-white divide-y divide-black/10 overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 sm:p-5 items-center">
                <Thumb item={item} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[15px]">{item.modelName || 'Oglinda personalizata'}</div>
                  <div className="text-[13px] text-black/50 mt-1">{[item.materialName, item.sizeLabel, item.standLabel].filter(Boolean).join(' · ')}</div>
                  <div className="flex items-center gap-1.5 text-[13px] text-black/60 mt-1.5">
                    <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: item.ledHex || '#fff', border: '1px solid rgba(0,0,0,0.15)', display: 'inline-block' }} />
                    LED {item.ledName}{item.dark ? ' · fundal negru' : ''}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 self-stretch justify-between">
                  <button type="button" onClick={() => removeItem(item.id)} aria-label="Elimina" className="text-black/30 hover:text-black/70 transition-colors">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
                  </button>
                  <div className="font-display text-[17px] font-medium whitespace-nowrap">{item.price * item.qty} <span className="text-[12px] text-black/45 font-sans">RON</span></div>
                  <QtyStepper qty={item.qty} onDec={() => updateQty(item.id, item.qty - 1)} onInc={() => updateQty(item.id, item.qty + 1)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={goConfigure} className="inline-flex items-center gap-1.5 text-[13px] text-[#17181A]/60 hover:text-[#17181A] transition-colors mt-4">
            <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span> Adauga inca o oglinda
          </button>
        </div>

        {/* Summary + delivery */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 lg:sticky lg:top-24">
          <div className="spectrum-line" style={{ width: '32px', marginBottom: '18px' }} />
          <div className="space-y-2.5 text-[13.5px]">
            <div className="flex justify-between"><span className="text-black/55">Subtotal</span><span className="font-medium">{total} RON</span></div>
            <div className="flex justify-between"><span className="text-black/55">Livrare</span><span className="text-black/55">se confirma</span></div>
          </div>
          <div className="border-t border-black/10 mt-4 pt-4 flex items-baseline justify-between">
            <span className="text-[14px] font-medium">Total</span>
            <span className="font-display text-2xl font-medium">{total} <span className="text-[13px] text-black/45 font-sans">RON</span></span>
          </div>
          <p className="text-[11px] text-black/40 text-right mt-0.5">TVA inclus</p>

          <p className="text-[11px] uppercase tracking-[0.12em] text-black/40 font-medium mt-7 mb-3">Date de livrare</p>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input value={form.name} onChange={set('name')} placeholder="numele tau" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="telefon" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <input type="email" value={form.email} onChange={set('email')} placeholder="email" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <input value={form.address} onChange={set('address')} placeholder="adresa (strada, numar)" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <div className="grid grid-cols-2 gap-2">
              <input value={form.city} onChange={set('city')} placeholder="oras" required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
              <input value={form.postcode} onChange={set('postcode')} placeholder="cod postal" className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            </div>
            <button type="submit" disabled={sending} className="cta-glow w-full bg-[#17181A] text-white rounded-full py-3.5 text-[14px] font-medium disabled:opacity-60 mt-1">
              {sending ? 'Se trimite...' : 'Trimite comanda'}
            </button>
          </form>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-black/45 mt-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            Plata securizata &nbsp;·&nbsp; Confirmare in 24h
          </div>
        </div>
      </div>
    </div>
  )
}
