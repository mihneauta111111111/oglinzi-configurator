import gallery1 from './assets/gallery1.jpg'
import gallery2 from './assets/gallery2.jpg'
import gallery3 from './assets/gallery3.jpg'

const EXAMPLES = [
  { username: 'beauty.salon', caption: 'Salonul perfect, oglindit in stil', likes: '2.2K', img: gallery1 },
  { username: 'rooftop.event', caption: 'Noaptea e mai frumoasa cu halo', likes: '5.1K', img: gallery2 },
  { username: 'studio.foto', caption: 'Fiecare cadru spune o poveste', likes: '3.8K', img: gallery3 },
]

const TESTIMONIALS = [
  { quote: 'Oglinda a ajuns exact cum am configurat-o, calitate premium.', name: 'Andreea M.', city: 'Bucuresti' },
  { quote: 'Clientii mei se opresc mereu sa faca poze cu ea.', name: 'Mihai R.', city: 'Cluj' },
  { quote: 'Cel mai bun decor pentru salonul meu, recomand cu toata increderea.', name: 'Larisa D.', city: 'Iasi' },
]

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/hzcKQXSaZYU?autoplay=1&mute=1&loop=1&playlist=hzcKQXSaZYU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
        className="absolute"
        style={{
          border: 'none',
          pointerEvents: 'none',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-16">
        <h1 className="font-display text-xl sm:text-2xl font-medium leading-tight max-w-lg text-white mb-2">Oglinda care spune povestea ta, nu doar reflexia ta</h1>
        <p className="text-white/60 max-w-xs mx-auto text-[12px] mb-5">Tu alegi marimea, materialul, culoarea LED. Noi construim.</p>
        <a href="#configurator" className="inline-block bg-white text-[#211D1A] rounded-lg px-6 py-2.5 text-[12px] font-medium hover:bg-[#FFC98A] transition-colors mb-4">Configureaza-ti oglinda</a>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <h2 className="font-display text-2xl font-medium text-center mb-2">Creatii recente</h2>
      <p className="text-black/55 text-center text-[14px] mb-10">Exemple placeholder, inlocuieste cu poze reale</p>
      <div className="grid sm:grid-cols-3 gap-6">
        {EXAMPLES.map((ex) => (
          <div key={ex.username} className="flex justify-center">
            <div className="w-64 rounded-[24px] bg-white overflow-hidden" style={{ boxShadow: '0 0 30px 4px ' + ex.hex + '60, 0 16px 28px -10px rgba(0,0,0,0.15)' }}>
              <div className="px-3 pt-2.5 pb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black/10 flex-shrink-0" />
                <span className="text-[11px] font-semibold truncate">{ex.username}</span>
              </div>
              <img src={ex.img} alt={ex.username} className="aspect-[4/5] mx-2 rounded-md object-cover w-full" />              <div className="px-3 py-2 text-[10px] text-black/70">{ex.likes} like-uri</div>
              <div className="px-3 pb-3 text-[10px] text-black/70 leading-snug">{ex.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <h2 className="font-display text-2xl font-medium text-center mb-2">Ce spun clientii</h2>
      <p className="text-black/55 text-center text-[14px] mb-10">Inlocuieste cu recenzii reale inainte de lansare</p>
      <div className="grid sm:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-2xl border border-black/10 p-5">
            <p className="text-[14px] leading-relaxed mb-4">{t.quote}</p>
            <p className="text-[12px] text-black/55">{t.name} - {t.city}</p>
          </div>
        ))}
      </div>
    </section>
  )
}