const EXAMPLES = [
  { username: 'andreea.beauty', caption: 'Salonul tau, in propria oglinda', likes: '3.2K', hex: '#FF7AAE' },
  { username: 'cafe.luna', caption: 'O cafenea care merita pozata', likes: '8.7K', hex: '#FFC98A' },
  { username: 'fitstudio.ro', caption: 'Antrenamentul perfect incepe aici', likes: '5.1K', hex: '#CFE3FF' },
]

const TESTIMONIALS = [
  { quote: 'Oglinda a ajuns exact cum am configurat-o, calitate premium.', name: 'Andreea M.', city: 'Bucuresti' },
  { quote: 'Clientii mei se opresc mereu sa faca poze cu ea.', name: 'Mihai R.', city: 'Cluj' },
  { quote: 'Cel mai bun decor pentru salonul meu, recomand cu toata increderea.', name: 'Larisa D.', city: 'Iasi' },
]

export function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
      <p className="text-[12px] uppercase tracking-wide text-[#E4633E] font-medium mb-3">halo.mirrors</p>
      <h1 className="font-display text-4xl sm:text-5xl font-medium leading-tight max-w-2xl mx-auto">Oglinda care spune povestea ta, nu doar reflexia ta</h1>
      <p className="text-black/60 max-w-md mx-auto mt-4 text-[15px]">Configurezi marimea, materialul, culoarea LED si fiecare detaliu al postarii. Tu alegi, noi construim.</p>
      <a href="#configurator" className="inline-block mt-7 bg-[#211D1A] text-white rounded-lg px-6 py-3 text-[14px] font-medium hover:bg-black transition-colors">Configureaza-ti oglinda</a>
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
            <div className="w-44 rounded-[24px] bg-white overflow-hidden" style={{ boxShadow: '0 0 30px 4px ' + ex.hex + '60, 0 16px 28px -10px rgba(0,0,0,0.15)' }}>
              <div className="px-3 pt-2.5 pb-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black/10 flex-shrink-0" />
                <span className="text-[11px] font-semibold truncate">{ex.username}</span>
              </div>
              <div className="aspect-[4/5] mx-2 rounded-md" style={{ background: 'linear-gradient(135deg, #E9E5DA 0%, #F6F3EC 45%, #DEDACE 100%)' }} />
              <div className="px-3 py-2 text-[10px] text-black/70">{ex.likes} like-uri</div>
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