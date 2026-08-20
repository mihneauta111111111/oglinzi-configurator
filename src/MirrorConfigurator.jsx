import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import MirrorPreview from './MirrorPreview'

const MATERIALS = [
  { id: 'sticla', name: 'Sticla' },
  { id: 'plexi', name: 'Plexi / Acrilic' },
]

const SIZES = [
  { id: 'S', label: '1.0m x 0.5m' },
  { id: 'M', label: '1.2m x 0.6m' },
  { id: 'L', label: '1.4m x 0.7m' },
]

const STAND_OPTIONS = [
  { id: 'no', label: 'Fara stander' },
  { id: 'yes', label: 'Cu stander' },
]

// TVA 21% inclus
const PRICES = {
  sticla: {
    no: { S: 1022, M: 1088, L: 1148 },
    yes: { S: 1209, M: 1271, L: 1452 },
  },
  plexi: {
    no: { S: 967, M: 1027, L: 1088 },
    yes: { S: 1209, M: 1271, L: 1452 },
  },
}

// Preturi separate pentru varianta fara banda LED (fara costul benzii),
// TVA 21% inclus. Plexi + suport foloseste acelasi pret ca sticla + suport,
// la fel ca in tabelul PRICES de mai sus.
const PRICES_NO_LED = {
  sticla: {
    no: { S: 871, M: 937, L: 997 },
    yes: { S: 1027, M: 1089, L: 1271 },
  },
  plexi: {
    no: { S: 816, M: 876, L: 937 },
    yes: { S: 1027, M: 1089, L: 1271 },
  },
}

const MODELS = [
  { id: 'halo', name: 'halo', dim: 'Marime mare, pe perete' },
  { id: 'baby', name: 'baby.halo', dim: '26 x 15 cm, de birou' },
]

// baby.halo: doar sticla, dimensiune fixa, pret unic - TVA 21% inclus
const BABY_PRICE = 151
const BABY_SIZE_LABEL = '26 x 15 cm'

const LED_COLORS = [
  { id: 'warm', name: 'Alb cald', hex: '#FFC98A' },
  { id: 'white', name: 'Alb', hex: '#F2F6FF' },
  { id: 'rgb', name: 'RGB + telecomanda', hex: '#B266FF', swatch: 'conic-gradient(from 0deg, #FF3B3B, #FFC93B, #3BFF6E, #3BC9FF, #B266FF, #FF3B3B)', extra: 36 },
  { id: 'red', name: 'Rosu', hex: '#FF3B3B' },
  { id: 'blue', name: 'Albastru', hex: '#3B82F6' },
  { id: 'uv', name: 'UV light', hex: '#8A2BE2' },
  { id: 'none', name: 'Fara iluminare', hex: '' },
]

const NO_LED = LED_COLORS.find((c) => c.id === 'none')

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <span style={{ position: 'relative', width: '40px', height: '23px', borderRadius: '999px', flexShrink: 0, background: checked ? '#17181A' : 'rgba(23,24,26,0.16)', boxShadow: checked ? '0 0 0 1px rgba(23,24,26,0.2), 0 4px 12px -3px rgba(23,24,26,0.4)' : 'inset 0 0 0 1px rgba(23,24,26,0.06)', transition: 'background 0.25s ease, box-shadow 0.25s ease' }}>
        <span style={{ position: 'absolute', top: '2px', left: '2px', width: '19px', height: '19px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transform: checked ? 'translateX(17px)' : 'translateX(0)', transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)' }} />
      </span>
      <span style={{ fontSize: '12px', color: 'rgba(23,24,26,0.6)' }}>{label}</span>
    </button>
  )
}

function MirrorConfigurator() {
  const [model, setModel] = useState('halo')
  const [material, setMaterial] = useState('sticla')
  const [size, setSize] = useState('M')
  const [stand, setStand] = useState('no')
  const [led, setLed] = useState('warm')
  const [avatar, setAvatar] = useState(null)
  const [username, setUsername] = useState('afacerea.ta')
  const [verified, setVerified] = useState(true)
  const [dark, setDark] = useState(false)
  const [location, setLocation] = useState('orasul tau')
  const [likes, setLikes] = useState('12.4K')
  const [comments, setComments] = useState('348')
  const [reposts, setReposts] = useState('92')
  const [shares, setShares] = useState('1.2K')
  const [caption, setCaption] = useState('Configureaza-ti propria oglinda, cu reflexia ta si stilul tau')
  const [hashtags, setHashtags] = useState('#halomirrors #oglindapersonalizata')
  const [showCustomize, setShowCustomize] = useState(false)
  const [added, setAdded] = useState(false)
  const [exclVat, setExclVat] = useState(false)

  const { addItem } = useCart()
  const navigate = useNavigate()

  const selectedMaterial = MATERIALS.find((m) => m.id === material)
  const selectedSize = SIZES.find((s) => s.id === size)
  const selectedStand = STAND_OPTIONS.find((s) => s.id === stand)
  const isBaby = model === 'baby'
  // baby.halo has no LED strip at all - ignore whatever color was picked earlier
  const selectedLed = isBaby ? NO_LED : LED_COLORS.find((c) => c.id === led)
  const activePrices = led === 'none' ? PRICES_NO_LED : PRICES
  const totalPrice = (isBaby ? BABY_PRICE : activePrices[material][stand][size] + (selectedLed.extra || 0))
  // Cart/checkout always uses totalPrice (TVA inclus, ce se plateste efectiv);
  // toggle-ul de mai jos e doar pentru afisare, sa compare clientul preturile.
  const displayPrice = exclVat ? Math.round(totalPrice / 1.21) : totalPrice
  const sizeLabel = isBaby ? BABY_SIZE_LABEL : selectedSize.label
  const modelName = isBaby ? 'baby.halo' : 'halo'

  function handleAvatar(e) {
    const file = e.target.files[0]
    if (!file) return
    // Store as data URL so the avatar survives in the cart / localStorage
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result)
    reader.readAsDataURL(file)
  }

  function handleAddToCart() {
    addItem({
      modelName,
      materialName: isBaby ? 'Sticla' : selectedMaterial.name,
      sizeLabel,
      standLabel: isBaby ? '' : selectedStand.label,
      size: isBaby ? null : size,
      stand: isBaby ? null : stand,
      isBaby,
      price: totalPrice,
      ledName: selectedLed.name,
      ledHex: selectedLed.hex,
      dark,
      username, location, verified, likes, comments, reposts, shares, caption, hashtags,
      avatar: avatar || '',
    })
    setAdded(true)
    navigate('/cos')
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Signature: the room lights up in the LED color you pick */}
      <div aria-hidden style={{ position: 'absolute', top: '6%', left: '50%', transform: 'translateX(-50%)', width: '82%', height: '68%', background: selectedLed.hex ? `radial-gradient(ellipse at center, ${selectedLed.hex}4d, ${selectedLed.hex}1f 42%, rgba(0,0,0,0) 70%)` : 'transparent', filter: 'blur(34px)', pointerEvents: 'none', transition: 'background 0.5s ease' }} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16 grid lg:grid-cols-[1fr_420px] gap-10">
      <div className="flex flex-col items-center lg:sticky lg:top-24 lg:self-start pt-6 gap-6 lg:gap-10">
        <div className="relative" style={{ width: 'min(360px, 100%)', zoom: isBaby ? 0.7 : 1 }}>
          {/* LED backlight bleeding from behind the mirror */}
          <div style={{ position: 'absolute', inset: '-30px', borderRadius: '72px', filter: 'blur(46px)', opacity: 0.5, backgroundColor: selectedLed.hex || 'transparent', transition: 'background-color 0.5s ease' }} />

          {/* Mirror body: the reusable Instagram-post card */}
          <MirrorPreview
            username={username}
            verified={verified}
            dark={dark}
            avatar={avatar}
            likes={likes}
            comments={comments}
            reposts={reposts}
            shares={shares}
            caption={caption}
            hashtags={hashtags}
            ledHex={selectedLed.hex}
          />

          {/* Grounding reflection */}
          <div style={{ width: '160px', height: '12px', margin: '20px auto 0', borderRadius: '50%', background: 'rgba(0,0,0,0.13)', filter: 'blur(9px)' }} />
        </div>

        {/* Reassurance card (desktop) - fills the space next to the form */}
        <div className="hidden lg:block w-full" style={{ maxWidth: '360px' }}>
          <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
            <div className="spectrum-line" style={{ width: '32px', marginBottom: '14px' }} />
            <p className="font-display text-[15px] font-medium mb-3">Comanda ta, fara griji</p>
            <ul className="space-y-2.5">
              {(isBaby ? ['Oglinda personalizata din sticla, 26 x 15 cm', 'Fara banda LED'] : ['Oglinda personalizata din sticla sau plexi', 'Banda LED cu alimentare la priza']).concat('Kit de prindere si ambalaj protejat').map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13px] text-black/65 leading-snug">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B7BFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                  {t}
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 mt-4 pt-3 text-[11.5px] text-black/45">
              Livrare 5-10 zile &nbsp;·&nbsp; Fabricat in Romania &nbsp;·&nbsp; Plata securizata
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Model</div>
          <div className="grid grid-cols-2 gap-2">
            {MODELS.map((m) => (
              <button key={m.id} type="button" onClick={() => setModel(m.id)} className={'rounded-xl border px-3 py-2.5 text-left transition-colors ' + (model === m.id ? 'border-[#17181A] bg-[#17181A]/5' : 'border-black/10 hover:border-black/25')}>
                <div className="text-[12px] font-medium">{m.name}</div>
                <div className="text-[11px] text-black/45 mt-0.5">{m.dim}</div>
              </button>
            ))}
          </div>
        </div>

        {!isBaby && (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Material</div>
            <div className="grid grid-cols-2 gap-2">
              {MATERIALS.map((m) => (
                <button key={m.id} type="button" onClick={() => setMaterial(m.id)} className={'rounded-xl border px-3 py-2.5 text-left transition-colors ' + (material === m.id ? 'border-[#17181A] bg-[#17181A]/5' : 'border-black/10 hover:border-black/25')}>
                  <div className="text-[12px] font-medium">{m.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {!isBaby && (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Suport</div>
            <div className="grid grid-cols-2 gap-2">
              {STAND_OPTIONS.map((s) => (
                <button key={s.id} type="button" onClick={() => setStand(s.id)} className={'rounded-xl border px-3 py-2.5 text-left transition-colors ' + (stand === s.id ? 'border-[#17181A] bg-[#17181A]/5' : 'border-black/10 hover:border-black/25')}>
                  <div className="text-[12px] font-medium">{s.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isBaby ? (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Marime</div>
            <div className="rounded-xl border border-black/10 px-3 py-2.5 text-[12px] text-black/60">Sticla, dimensiune fixa <span className="font-medium text-[#17181A]">26 x 15 cm</span></div>
          </div>
        ) : (
          <div>
            <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Marime</div>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((s) => (
                <button key={s.id} type="button" onClick={() => setSize(s.id)} className={'rounded-xl border px-3 py-2.5 text-left transition-colors ' + (size === s.id ? 'border-[#17181A] bg-[#17181A]/5' : 'border-black/10 hover:border-black/25')}>
                  <div className="text-[12px] font-medium">{s.label}</div>
                  <div className="text-[11px] text-black/45 mt-0.5">{exclVat ? Math.round(activePrices[material][stand][s.id] / 1.21) : activePrices[material][stand][s.id]} RON</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">{isBaby ? 'Stil postare' : 'Culoare LED'}</div>
          <div className={'flex items-center gap-4 flex-wrap' + (isBaby ? '' : ' justify-between')}>
            {!isBaby && (
              <div className="flex gap-3">
                {LED_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    title={c.name + (c.extra ? ` (+${c.extra} RON)` : '')}
                    onClick={() => setLed(c.id)}
                    className={'relative w-9 h-9 rounded-full ring-2 transition-transform overflow-hidden ' + (led === c.id ? 'ring-black scale-110' : 'ring-transparent')}
                    style={{ background: c.swatch || c.hex || '#fff', border: '1px solid rgba(0,0,0,0.15)' }}
                  >
                    {!c.hex && (
                      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                        <line x1="4" y1="20" x2="20" y2="4" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-5">
              <Toggle checked={verified} onChange={setVerified} label="Verificat" />
              <Toggle checked={dark} onChange={setDark} label="Fundal negru" />
            </div>
          </div>
          {!isBaby && (
            <div className="text-[11px] text-black/45 mt-2">
              {selectedLed.name}{selectedLed.extra ? ` · +${selectedLed.extra} RON` : ''}
            </div>
          )}
        </div>

        {/* Optional post details - collapsed so the core flow stays short */}
        <div className="border-t border-black/10 pt-4">
          <button type="button" onClick={() => setShowCustomize((v) => !v)} aria-expanded={showCustomize} className="w-full flex items-center justify-between gap-4 text-left">
            <span>
              <span className="block text-[13px] font-medium">Personalizeaza postarea</span>
              <span className="block text-[11px] text-black/45 mt-0.5">poza, username, statistici, descriere</span>
            </span>
            <span style={{ transition: 'transform 0.3s ease', transform: showCustomize ? 'rotate(45deg)' : 'none', color: '#9B7BFF', fontSize: '22px', lineHeight: 1, flexShrink: 0 }}>+</span>
          </button>
          {showCustomize && (
            <div className="space-y-2 pt-4">
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Poza de profil</span>
                <div style={{ marginTop: '6px', border: '1.5px dashed rgba(0,0,0,0.2)', borderRadius: '10px', padding: '10px', textAlign: 'center', backgroundColor: avatar ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  {avatar ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={avatar} alt="preview" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>Poza selectata</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Apasa pentru a incarca poza de profil</span>
                  )}
                  <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
                </div>
                <p style={{ fontSize: '10.5px', color: 'rgba(0,0,0,0.4)', marginTop: '5px' }}>Poza iese mai clara daca nu folosesti o captura de ecran (screenshot).</p>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="locatie" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input value={likes} onChange={(e) => setLikes(e.target.value)} placeholder="like-uri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
                <input value={comments} onChange={(e) => setComments(e.target.value)} placeholder="comentarii" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
                <input value={reposts} onChange={(e) => setReposts(e.target.value)} placeholder="repost-uri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
                <input value={shares} onChange={(e) => setShares(e.target.value)} placeholder="distribuiri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
              </div>
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="descriere" rows={2} className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
              <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="#hashtaguri" className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#17181A]" />
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-black/10">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[13px] text-black/55">Pret</span>
            <span className="font-display text-3xl font-medium">{displayPrice} RON</span>
          </div>
          <div className="flex items-center justify-end gap-2 mb-4">
            <span className="text-[11px] text-black/40">{exclVat ? 'Pret fara TVA' : 'TVA inclus'}</span>
            <div className="inline-flex items-center rounded-full border border-black/12 p-0.5 text-[10.5px] font-medium">
              <button type="button" onClick={() => setExclVat(false)} className={'rounded-full px-2.5 py-1 transition-colors ' + (!exclVat ? 'bg-[#17181A] text-white' : 'text-black/45')}>Cu TVA</button>
              <button type="button" onClick={() => setExclVat(true)} className={'rounded-full px-2.5 py-1 transition-colors ' + (exclVat ? 'bg-[#17181A] text-white' : 'text-black/45')}>Fara TVA</button>
            </div>
          </div>
          <button type="button" onClick={handleAddToCart} className="cta-glow w-full bg-[#17181A] text-white rounded-full py-3.5 text-[14px] font-medium">
            {added ? 'Adaugat · vezi cosul' : 'Adauga in cos'}
          </button>
          <p className="text-[11px] text-black/45 text-center pt-3">Plata securizata &nbsp;·&nbsp; Livrare in toata tara &nbsp;·&nbsp; Fara plata acum</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MirrorConfigurator