import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import galleryTattoo from './assets/gallery-tattoo.jpg'
import galleryFlori from './assets/gallery-flori.jpg'
import galleryEveniment from './assets/gallery-eveniment.jpg'
import galleryHaloLed from './assets/gallery-halo-led.jpg'
import galleryResort from './assets/gallery-resort.jpg'

const EXAMPLES = [
  { username: 'halo.mirrors', caption: 'Oglinda care atrage priviri si creeaza continut pentru brandul tau.', likes: '111K', img: galleryHaloLed },
  { username: 'rheearoses', caption: 'Din 2020 va facem iubitele fericite.', likes: '555K', img: galleryFlori },
  { username: 'domeniulterraqua', caption: 'Locul unde-ti dai Restart.', likes: '77.7K', img: galleryResort },
  { username: 'primegraduateevents', caption: 'Look good. Feel good. Graduate.', likes: '88K', img: galleryEveniment },
  { username: 'cre23tin', caption: 'Look closer... you are the art.', likes: '17.6K', img: galleryTattoo },
]

const SPECS = [
  { label: 'Material', value: 'Sticla & plexi', note: 'Taiata la comanda, finisaj premium.' },
  { label: 'Lumina LED', value: '6 culori', note: 'Cald, alb, RGB, rosu, albastru sau UV - direct la priza.' },
  { label: 'Personalizare', value: '100%', note: 'Poza, username, statistici si descriere.' },
  { label: 'Productie', value: 'Fabricat in RO', note: 'Livrat in 5-10 zile oriunde in tara.' },
]

const STEPS = [
  { title: 'Configureaza', text: 'Alege model, marime si culoare LED, apoi personalizeaza postarea.', hue: '#FFC98A' },
  { title: 'Comanda', text: 'Adaugi oglinda in cos si trimiti comanda in cateva secunde.', hue: '#FF6FA5' },
  { title: 'Productie', text: 'Confectionam oglinda ta unicat in cateva zile lucratoare.', hue: '#9B7BFF' },
  { title: 'Livrare', text: 'O primesti acasa, gata de agatat pe perete si de pus in priza.', hue: '#BFD8FF' },
]

const TESTIMONIALS = [
  { quote: 'Oglinda a ajuns exact cum am configurat-o, calitate premium.', name: 'Andreea M.', city: 'Bucuresti' },
  { quote: 'Clientii mei se opresc mereu sa faca poze cu ea.', name: 'Mihai R.', city: 'Cluj' },
  { quote: 'Cel mai bun decor pentru salonul meu, recomand cu toata increderea.', name: 'Larisa D.', city: 'Iasi' },
]

const FAQ = [
  { q: 'Cat dureaza pana primesc oglinda?', a: 'In general 5-10 zile lucratoare de la confirmarea comenzii, in functie de configuratie si de perioada.' },
  { q: 'Pot pune propria poza si username?', a: 'Da. Configuratorul iti arata in timp real cum va arata oglinda ta, cu poza, username, bifa de verificat si statistici.' },
  { q: 'Ce culori de LED sunt disponibile?', a: 'Alb cald, alb, RGB cu telecomanda (+36 RON), rosu, albastru sau UV light. Poti alege si varianta fara iluminare, cu preturi separate. Banda LED se aprinde direct in priza si lumineaza conturul oglinzii.' },
  { q: 'Livrati in toata tara?', a: 'Da, livram oriunde in Romania. Costul exact de livrare se confirma odata cu oferta.' },
  { q: 'Cum se monteaza?', a: 'Vine gata de agatat pe perete, iar optional poti alege stander. Se conecteaza simplu la priza.' },
]

function Eyebrow({ children, tone = 'dark', center = true }) {
  const color = tone === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(23,24,26,0.5)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: center ? 'center' : 'flex-start', marginBottom: '16px' }}>
      <span className="spectrum-line" style={{ width: '30px' }} />
      <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color, fontWeight: 500 }}>{children}</span>
      {center && <span className="spectrum-line" style={{ width: '30px' }} />}
    </div>
  )
}

export function Hero() {
  const videoRef = useRef(null)
  useEffect(() => {
    // Force muted so browsers allow autoplay
    if (videoRef.current) videoRef.current.muted = true
  }, [])
  return (
    <section id="acasa" className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ pointerEvents: 'none' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,11,13,0.35) 0%, rgba(10,11,13,0.05) 38%, rgba(10,11,13,0.7) 100%)' }} />
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-24">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '18px' }}>
            <span className="spectrum-line" style={{ width: '26px' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>Oglinzi LED personalizate</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-medium leading-[1.05] max-w-2xl text-white mb-4">Oglinda care spune povestea ta, nu doar reflexia ta</h1>
          <p className="text-white/70 max-w-md mx-auto text-[14px] sm:text-[15px] mb-7">Configurezi materialul, marimea si culoarea LED, vezi rezultatul live si primesti oferta pe loc.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a href="#configurator" className="cta-glow inline-block bg-white text-[#17181A] rounded-full px-7 py-3.5 text-[14px] font-medium">Configureaza-ti oglinda</a>
            <a href="#galerie" className="inline-block rounded-full px-7 py-3.5 text-[14px] font-medium text-white border border-white/40 hover:bg-white/10 transition-colors">Vezi galeria</a>
          </div>
          <p className="text-white/55 text-[12.5px] tracking-wide">de la 799 lei &nbsp;·&nbsp; Livrare 5-10 zile &nbsp;·&nbsp; Fabricat in Romania</p>
        </Reveal>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/45">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </section>
  )
}

export function TrustStrip() {
  const items = ['Sticla & plexi premium', 'Personalizare 100%', 'Livrare in toata tara', 'Plata securizata']
  return (
    <div className="border-y border-[#17181A]/10 bg-white/60">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((t) => (
          <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px', color: 'rgba(23,24,26,0.7)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9B7BFF', flexShrink: 0 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Benefits() {
  return (
    <section id="beneficii" className="max-w-6xl mx-auto px-6 py-16">
      <Reveal className="text-center mb-10">
        <Eyebrow>De ce halo.mirrors</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-medium">Un obiect de decor, nu doar o oglinda</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
        {SPECS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="spectrum-line" style={{ marginBottom: '18px' }} />
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#17181A]/45 mb-3">{s.label}</p>
            <p className="font-display text-2xl font-medium mb-2 leading-tight">{s.value}</p>
            <p className="text-[13px] text-[#17181A]/55 leading-relaxed">{s.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section id="galerie" className="max-w-6xl mx-auto px-6 py-16">
      <Reveal className="text-center mb-10">
        <Eyebrow>Galerie</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-medium mb-2">Creatii recente</h2>
        <p className="text-[#17181A]/55 text-[14px]">Oglinzi halo.mirrors, la clienti reali</p>
      </Reveal>
      <div className="flex flex-wrap justify-center gap-6">
        {EXAMPLES.map((ex, i) => (
          <Reveal key={ex.username} delay={i * 90} className="flex justify-center">
            <div className="group lift w-64 rounded-[24px] bg-white overflow-hidden shadow-[0_16px_30px_-16px_rgba(23,24,26,0.22)]">
              <div className="px-3 pt-2.5 pb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#17181A]/10 flex-shrink-0" />
                <span className="text-[11px] font-semibold truncate">{ex.username}</span>
              </div>
              <div className="mx-2 rounded-md overflow-hidden">
                <img src={ex.img} alt={ex.username} className="aspect-[4/5] object-cover w-full block transition-transform duration-500 group-hover:scale-[1.05]" />
              </div>
              <div className="px-3 py-2 text-[10px] text-[#17181A]/70">{ex.likes} like-uri</div>
              <div className="px-3 pb-3 text-[10px] text-[#17181A]/70 leading-snug">{ex.caption}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="text-center mt-10">
        <a href="#configurator" className="cta-glow inline-block bg-[#17181A] text-white rounded-full px-7 py-3.5 text-[14px] font-medium">Configureaza-ti varianta ta</a>
      </Reveal>
    </section>
  )
}

export function Process() {
  return (
    <section id="proces" style={{ background: '#17181A' }} className="text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Reveal className="text-center mb-12">
          <Eyebrow tone="light">Cum functioneaza</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-medium">De la idee la perete, in patru pasi</h2>
        </Reveal>
        <div className="relative">
          {/* The LED strip that threads the steps together (desktop) */}
          <div className="hidden lg:block absolute" style={{ top: '9px', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(90deg, #FFC98A, #FF6FA5, #9B7BFF, #BFD8FF)', opacity: 0.5 }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="text-center">
                <div className="relative mx-auto" style={{ width: '20px', height: '20px' }}>
                  <div style={{ position: 'absolute', inset: '-9px', borderRadius: '50%', background: s.hue, filter: 'blur(9px)', opacity: 0.6 }} />
                  <div style={{ position: 'relative', width: '20px', height: '20px', borderRadius: '50%', background: s.hue, boxShadow: `0 0 14px 2px ${s.hue}`, border: '2px solid #17181A' }} />
                </div>
                <h3 className="font-display text-lg font-medium mt-6 mb-2">{s.title}</h3>
                <p className="text-[13px] text-white/55 leading-relaxed max-w-[220px] mx-auto">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section id="recenzii" className="max-w-6xl mx-auto px-6 py-16">
      <Reveal className="text-center mb-10">
        <Eyebrow>Recenzii</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-medium mb-2">Ce spun clientii</h2>
        <p className="text-[#17181A]/55 text-[14px]">Inlocuieste cu recenzii reale inainte de lansare</p>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 90} className="lift rounded-2xl border border-[#17181A]/10 p-6 bg-white">
            <div style={{ color: '#FFC98A', fontSize: '16px', marginBottom: '12px', letterSpacing: '2px' }}>{'★★★★★'}</div>
            <p className="text-[14px] leading-relaxed mb-4">{t.quote}</p>
            <p className="text-[12px] text-[#17181A]/55">{t.name} - {t.city}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-16">
      <Reveal className="text-center mb-10">
        <Eyebrow>Intrebari frecvente</Eyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-medium">Ce vor sa stie clientii</h2>
      </Reveal>
      <div className="divide-y divide-[#17181A]/10 border-y border-[#17181A]/10">
        {FAQ.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-[16px] font-medium">{item.q}</span>
                <span style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none', flexShrink: 0, color: '#9B7BFF', fontSize: '24px', lineHeight: 1 }}>+</span>
              </button>
              <div style={{ maxHeight: isOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                <p className="text-[14px] text-[#17181A]/60 leading-relaxed pb-5 pr-8">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function StickyCta() {
  return (
    <div
      className="md:hidden"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: 'rgba(236,238,240,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(23,24,26,0.1)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
    >
      <div style={{ lineHeight: 1.15 }}>
        <div style={{ fontSize: '11px', color: 'rgba(23,24,26,0.5)' }}>Oglinda personalizata</div>
        <div className="font-display" style={{ fontSize: '17px', fontWeight: 500 }}>de la 799 lei</div>
      </div>
      <a href="#configurator" className="cta-glow" style={{ background: '#17181A', color: '#fff', borderRadius: '999px', padding: '12px 22px', fontSize: '14px', fontWeight: 500, whiteSpace: 'nowrap' }}>Configureaza</a>
    </div>
  )
}
