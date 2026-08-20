import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import MirrorPreview from './MirrorPreview'
import SearchableSelect from './SearchableSelect'
import { getCartShippingTotal } from './shipping'
import judeteData from './data/judete.json'

const JUDETE_OPTIONS = judeteData.map((j) => ({ value: j.cod, label: j.nume }))
const localitatiModules = import.meta.glob('./data/localitati/*.json')

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
  const [form, setForm] = useState({
    customerType: 'pf', lastName: '', firstName: '', phone: '', email: '', address: '',
    judet: '', localitate: '', postcode: '',
    companyName: '', cui: '', regCom: '',
  })
  const [localitatiOptions, setLocalitatiOptions] = useState([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const goConfigure = () => { navigate('/'); setTimeout(() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' }), 80) }

  const selectedJudetLabel = JUDETE_OPTIONS.find((j) => j.value === form.judet)?.label || ''

  function handleJudetChange(cod) {
    setForm((f) => ({ ...f, judet: cod, localitate: '' }))
    setLocalitatiOptions([])
  }

  // Localitatile depind de judetul ales - incarcate doar cand e nevoie
  // (import.meta.glob lazy), nu toata tara dintr-o data.
  useEffect(() => {
    if (!form.judet) return
    let cancelled = false
    const loader = localitatiModules[`./data/localitati/${form.judet}.json`]
    if (!loader) return
    loader().then((mod) => {
      if (cancelled) return
      setLocalitatiOptions(mod.default.map((nume) => ({ value: nume, label: nume })))
    })
    return () => { cancelled = true }
  }, [form.judet])

  const shippingCost = useMemo(() => getCartShippingTotal(items, form.judet), [items, form.judet])
  const grandTotal = total + (shippingCost || 0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!items.length) return
    setSending(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://halomirrors.local'
      const response = await fetch(apiUrl + '/wp-json/halo/v1/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          judetNume: selectedJudetLabel,
          subtotal: total,
          shippingCost: shippingCost || 0,
          total: grandTotal,
          items,
        }),
      })
      if (response.ok) {
        const result = await response.json()
        clear()
        setPaymentInfo(result)
        setSent(true)
      } else {
        const error = await response.json().catch(() => null)
        alert(error?.message || 'A aparut o eroare. Incearca din nou.')
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
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button onClick={() => navigate('/')} className="cta-glow inline-block bg-[#17181A] text-white rounded-full px-7 py-3.5 text-[14px] font-medium">Inapoi la site</button>
          {paymentInfo?.payment_available && paymentInfo?.payment_url && (
            <a href={paymentInfo.payment_url} className="cta-glow inline-block border border-[#17181A]/15 text-[#17181A] rounded-full px-7 py-3.5 text-[14px] font-medium">Plateste online acum</a>
          )}
        </div>
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
            <div className="flex justify-between">
              <span className="text-black/55">Livrare</span>
              <span className={form.judet ? 'font-medium' : 'text-black/40'}>{form.judet ? `${shippingCost} RON` : 'selecteaza judetul'}</span>
            </div>
          </div>
          <div className="border-t border-black/10 mt-4 pt-4 flex items-baseline justify-between">
            <span className="text-[14px] font-medium">Total</span>
            <span className="font-display text-2xl font-medium">{grandTotal} <span className="text-[13px] text-black/45 font-sans">RON</span></span>
          </div>
          <p className="text-[11px] text-black/40 text-right mt-0.5">TVA inclus</p>

          <p className="text-[11px] uppercase tracking-[0.12em] text-black/40 font-medium mt-7 mb-3">Date de livrare</p>
          <div className="inline-flex rounded-full border border-black/12 p-0.5 mb-2.5">
            {[['pf', 'Persoana fizica'], ['pj', 'Firma']].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setForm((f) => ({ ...f, customerType: val }))}
                className={'px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ' + (form.customerType === val ? 'bg-[#17181A] text-white' : 'text-black/50')}
              >
                {label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            {form.customerType === 'pj' && (
              <>
                <input value={form.companyName} onChange={set('companyName')} placeholder="denumire firma" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={form.cui} onChange={set('cui')} placeholder="CUI" required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
                  <input value={form.regCom} onChange={set('regCom')} placeholder="nr. Reg. Com." required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input value={form.lastName} onChange={set('lastName')} placeholder="nume" required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
              <input value={form.firstName} onChange={set('firstName')} placeholder="prenume" required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            </div>
            {form.customerType === 'pj' && (
              <p className="text-[10.5px] text-black/40 -mt-1">Persoana de contact pentru livrare</p>
            )}
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="telefon" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <input type="email" value={form.email} onChange={set('email')} placeholder="email" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <div className="grid grid-cols-2 gap-2">
              <SearchableSelect
                value={form.judet}
                onChange={handleJudetChange}
                options={JUDETE_OPTIONS}
                placeholder="judet"
                required
              />
              <SearchableSelect
                value={form.localitate}
                onChange={(val) => setForm((f) => ({ ...f, localitate: val }))}
                options={localitatiOptions}
                placeholder={form.judet ? 'localitate' : 'alege intai judetul'}
                disabled={!form.judet}
                required
              />
            </div>
            <input value={form.address} onChange={set('address')} placeholder="adresa (strada, numar)" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
            <input value={form.postcode} onChange={set('postcode')} placeholder="cod postal" className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#17181A]" />
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
