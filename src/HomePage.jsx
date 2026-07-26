import { useState } from 'react'
import MirrorConfigurator from './MirrorConfigurator'
import { Hero, TrustStrip, Benefits, Gallery, Process, Testimonials, Faq } from './LandingSections'
import Reveal from './Reveal'
import SplashScreen from './SplashScreen'

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(() => sessionStorage.getItem('halo_splash') === '1')

  return (
    <>
      {!splashDone && (
        <SplashScreen onDone={() => { sessionStorage.setItem('halo_splash', '1'); setSplashDone(true) }} />
      )}
      <main>
        <Hero />
        <TrustStrip />
        <Benefits />
        <Gallery />
        <Process />
        <section id="configurator" className="border-t border-[#17181A]/10">
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-2 text-center">
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                <span className="spectrum-line" style={{ width: '30px' }} />
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(23,24,26,0.5)', fontWeight: 500 }}>Configurator</span>
                <span className="spectrum-line" style={{ width: '30px' }} />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium mb-2">Configureaza-ti oglinda</h2>
              <p className="text-[#17181A]/55 text-[14px] max-w-md mx-auto">Personalizeaza fiecare detaliu si vezi rezultatul in timp real. Adaugi in cos cand esti gata.</p>
            </Reveal>
          </div>
          <MirrorConfigurator />
        </section>
        <Testimonials />
        <Faq />
      </main>
    </>
  )
}
