import { useState } from 'react'
import MirrorConfigurator from './MirrorConfigurator'
import { Hero, Gallery, Testimonials } from './LandingSections'
import SplashScreen from './SplashScreen'
import Footer from './Footer'

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#211D1A]">
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <header className="px-6 py-5 border-b border-black/10">
        <span className="font-display text-lg font-medium">halo.mirrors</span>
      </header>
      <Hero />
      <Gallery />
      <Testimonials />
      <div id="configurator" className="border-t border-black/10">
        <MirrorConfigurator />
      </div>
      <Footer />
    </div>
  )
}

export default App