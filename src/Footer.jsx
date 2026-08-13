import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LEGAL_LINKS } from './legalRoutes'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function goConfigure() {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } else {
      document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer style={{ backgroundColor: '#17181A', color: '#fff' }}>
      <div style={{ height: '2px', background: 'linear-gradient(90deg, #FFC98A, #FF6FA5, #9B7BFF, #BFD8FF)' }} />
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '72px 24px 36px' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '64px', marginBottom: '64px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontWeight: 500 }}>halo.mirrors</p>
            <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 500, lineHeight: 1.3, maxWidth: '320px' }}>Mirrors · Light · Design</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '16px', lineHeight: 1.7, maxWidth: '300px' }}>Oglinzi personalizate din sticla si plexi, cu banda LED si grafica Instagram configurabila.</p>
            <button type="button" onClick={goConfigure} className="cta-glow" style={{ display: 'inline-block', marginTop: '28px', backgroundColor: '#fff', color: '#17181A', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', borderRadius: '999px', border: 'none', cursor: 'pointer' }}>Configureaza acum</button>
          </div>

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', fontWeight: 500 }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="tel:0728085494" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.02em' }}>0728 085 494</a>
              <a href="mailto:contact@halomirrors.ro" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>contact@halomirrors.ro</a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', fontWeight: 500 }}>Social</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="https://instagram.com/halo.mirrors" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.02em' }}>Instagram</a>
              <a href="https://tiktok.com/@halo.mirrors" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.02em' }}>TikTok</a>
            </div>
          </div>
        </div>

        {/* Legal + trust row (required before enabling online payments) */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
          {LEGAL_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '12px' }}>{label}</Link>
          ))}
          <a href="https://anpc.ro" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '12px' }}>ANPC</a>
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '12px' }}>Solutionare online (SOL)</a>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>© 2026 HALO MIRRORS. TOATE DREPTURILE REZERVATE.</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>Plata securizata · Fabricat in Romania</p>
        </div>
      </div>
    </footer>
  )
}
