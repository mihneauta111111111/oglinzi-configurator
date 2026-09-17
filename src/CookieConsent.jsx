import { useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'halo_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY)
    } catch {
      // localStorage indisponibil (mod privat etc.) - nu blocam pagina pentru asta
      return false
    }
  })

  function choose(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: new Date().toISOString() }))
    } catch {
      // ignoram - daca nu se poate salva, banner-ul revine la refresh, nu e grav
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Preferinte cookie-uri"
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 100,
        background: '#17181A', color: '#fff',
        boxShadow: '0 -8px 30px -10px rgba(0,0,0,0.4)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="spectrum-line hidden sm:block" style={{ width: '3px', height: '40px', flexShrink: 0 }} />
        <p className="text-[13px] text-white/70 leading-relaxed flex-1">
          Folosim doar cookie-uri/stocare locala esentiale pentru functionarea site-ului (ex: cosul de cumparaturi). Nu avem inca cookie-uri de analiza sau marketing active.{' '}
          <Link to="/politica-cookie" className="underline text-white hover:text-white/80">Detalii in Politica cookie</Link>.
        </p>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => choose('essential')}
            className="rounded-full border border-white/25 px-4 py-2.5 text-[12.5px] font-medium text-white/80 hover:text-white hover:border-white/50 transition-colors"
          >
            Doar esentiale
          </button>
          <button
            type="button"
            onClick={() => choose('all')}
            className="cta-glow rounded-full bg-white text-[#17181A] px-5 py-2.5 text-[12.5px] font-medium"
          >
            Accepta toate
          </button>
        </div>
      </div>
    </div>
  )
}
