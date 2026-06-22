import { useState } from 'react'
const MATERIALS = [
  { id: 'sticla', name: 'Sticla' },
  { id: 'plexi', name: 'Plexi / Acrilic' },
]

const SIZES = [
  { id: 'S', label: '1.0m x 0.5m' },
  { id: 'M', label: '1.2m x 0.6m' },
  { id: 'L', label: '1.4m x 0.7m' },
]

const PRICES = {
  sticla: { S: 845, M: 899, L: 949 },
  plexi: { S: 799, M: 849, L: 899 },
}

const LED_COLORS = [
  { id: 'warm', name: 'Alb cald', hex: '#FFC98A' },
  { id: 'cool', name: 'Alb rece', hex: '#CFE3FF' },
  { id: 'pink', name: 'Roz', hex: '#FF7AAE' },
  { id: 'purple', name: 'Mov', hex: '#B388FF' },
]

function MirrorConfigurator() {
  const [material, setMaterial] = useState('sticla')
  const [size, setSize] = useState('M')
  const [led, setLed] = useState('warm')
  const [avatar, setAvatar] = useState(null)
  const [username, setUsername] = useState('afacerea.ta')
  const [verified, setVerified] = useState(true)
  const [location, setLocation] = useState('orasul tau')
  const [likes, setLikes] = useState('12.4K')
  const [comments, setComments] = useState('348')
  const [reposts, setReposts] = useState('92')
  const [shares, setShares] = useState('1.2K')
  const [caption, setCaption] = useState('Configureaza-ti propria oglinda, cu reflectia ta si stilul tau')
  const [hashtags, setHashtags] = useState('#halomirrors #oglindapersonalizata')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  const [sending, setSending] = useState(false)

  const selectedMaterial = MATERIALS.find((m) => m.id === material)
  const selectedSize = SIZES.find((s) => s.id === size)
  const selectedLed = LED_COLORS.find((c) => c.id === led)
  const totalPrice = PRICES[material][size]

  function handleAvatar(e) {
    const file = e.target.files[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      const response = await fetch('http://halomirrors.local/wp-json/halo/v1/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          city,
          postcode,
          materialName: selectedMaterial.name,
          sizeLabel: selectedSize.label,
          price: totalPrice,
          ledName: selectedLed.name,
          username,
          location,
          verified,
          likes,
          comments,
          reposts,
          shares,
          caption,
          hashtags,
          mirrorImage: avatar || '',
        }),
      })
      if (response.ok) {
        alert('Cererea a fost trimisa! Te contactam in scurt timp.')
      } else {
        alert('A aparut o eroare. Incearca din nou.')
      }
    } catch (err) {
      console.error('Eroare detaliata:', err)
      alert('Nu am putut trimite cererea. Verifica conexiunea.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_420px] gap-12">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-10 rounded-[60px] blur-3xl opacity-40 transition-colors duration-500" style={{ backgroundColor: selectedLed.hex }} />
          <div className="relative w-[280px] rounded-[34px] bg-white overflow-hidden transition-shadow duration-500" style={{ boxShadow: '0 0 50px 8px ' + selectedLed.hex + '80, 0 24px 40px -12px rgba(0,0,0,0.18)' }}>
            <div className="px-4 pt-3 pb-2 text-[11px] font-medium text-black/70">11:11</div>
            <div className="flex items-center gap-2.5 px-4 pb-3">
              <div className="w-9 h-9 rounded-full p-[2px] flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FFB199, #E4633E, #B388FF)' }}>
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-medium uppercase">{username.slice(0, 2)}</div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-semibold truncate max-w-[140px]">{username}</span>
                  {verified && (
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#4F8FE0] text-white text-[8px] flex-shrink-0">v</span>
                  )}
                </div>
                <div className="text-[10px] text-black/50 truncate max-w-[160px]">{location}</div>
              </div>
            </div>
            <div className="relative mx-3 rounded-lg overflow-hidden aspect-[4/5] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E9E5DA 0%, #F6F3EC 45%, #DEDACE 100%)' }}>
              <span className="text-[11px] text-black/30">reflectia ta</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 text-[12px]">
              <span>❤️ {likes}</span>
              <span>💬 {comments}</span>
              <span>🔁 {reposts}</span>
              <span className="ml-auto">📤 {shares}</span>
            </div>
            <div className="px-4 pb-4 text-[11px] leading-snug">
              <span className="font-semibold">{username}</span>{' '}
              <span className="whitespace-pre-wrap">{caption}</span>
              <div className="text-[#4F8FE0] mt-1">{hashtags}</div>
            </div>
          </div>
          <div className="w-36 h-3 mx-auto mt-5 rounded-full bg-black/10 blur-md" />
        </div>
      </div>

      <div className="space-y-7">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Material</div>
          <div className="grid grid-cols-2 gap-2">
            {MATERIALS.map((m) => (
              <button key={m.id} type="button" onClick={() => setMaterial(m.id)} className={'rounded-xl border px-3 py-3 text-left transition-colors ' + (material === m.id ? 'border-[#E4633E] bg-[#E4633E]/5' : 'border-black/10 hover:border-black/25')}>
                <div className="text-[12px] font-medium">{m.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Marime</div>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button key={s.id} type="button" onClick={() => setSize(s.id)} className={'rounded-xl border px-3 py-3 text-left transition-colors ' + (size === s.id ? 'border-[#E4633E] bg-[#E4633E]/5' : 'border-black/10 hover:border-black/25')}>
                <div className="text-[12px] font-medium">{s.label}</div>
                <div className="text-[11px] text-black/45 mt-1">{PRICES[material][s.id]} RON</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Culoare LED</div>
          <div className="flex gap-3">
            {LED_COLORS.map((c) => (
              <button key={c.id} type="button" title={c.name} onClick={() => setLed(c.id)} className={'w-9 h-9 rounded-full ring-2 transition-transform ' + (led === c.id ? 'ring-black scale-110' : 'ring-transparent')} style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Profil</div>
          <div className="space-y-2">
            <label style={{ display: 'block', cursor: 'pointer' }}>
  <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>Poza de profil</span>
  <div style={{ marginTop: '6px', border: '1.5px dashed rgba(0,0,0,0.2)', borderRadius: '10px', padding: '12px', textAlign: 'center', backgroundColor: avatar ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
    {avatar ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={avatar} alt="preview" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>Poza selectata</span>
      </div>
    ) : (
      <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>Apasa pentru a incarca poza de profil</span>
    )}
    <input type="file" accept="image/*" onChange={handleAvatar} style={{ display: 'none' }} />
  </div>
</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="locatie" className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <label className="flex items-center gap-2 text-[12px] text-black/60">
              <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
              Bifa verificat
            </label>
          </div>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wide text-black/45 mb-2 font-medium">Postare</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input value={likes} onChange={(e) => setLikes(e.target.value)} placeholder="like-uri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input value={comments} onChange={(e) => setComments(e.target.value)} placeholder="comentarii" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input value={reposts} onChange={(e) => setReposts(e.target.value)} placeholder="repost-uri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input value={shares} onChange={(e) => setShares(e.target.value)} placeholder="distribuiri" className="rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
          </div>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="descriere" rows={3} className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E] mb-2" />
          <input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="#hashtaguri" className="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] focus:outline-none focus:border-[#E4633E]" />
        </div>

        <div className="pt-5 border-t border-black/10">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-[13px] text-black/55">Pret</span>
            <span className="font-display text-3xl font-medium">{totalPrice} RON</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="numele tau" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="telefon" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="adresa (strada, numar)" required className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            <div className="grid grid-cols-2 gap-2">
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="oras" required className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
              <input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="cod postal" className="rounded-lg border border-black/10 px-3 py-2.5 text-[13px] focus:outline-none focus:border-[#E4633E]" />
            </div>
            <button type="submit" disabled={sending} className="w-full bg-[#211D1A] text-white rounded-lg py-3 text-[14px] font-medium hover:bg-black transition-colors disabled:opacity-60">
              {sending ? 'Se trimite...' : 'Cere oferta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MirrorConfigurator