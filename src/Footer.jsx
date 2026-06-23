export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '64px', marginBottom: '80px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', fontWeight: '500' }}>halo.mirrors</p>
            <h2 style={{ fontSize: '28px', fontWeight: '500', lineHeight: '1.3', maxWidth: '320px', fontFamily: 'Bricolage Grotesque, sans-serif' }}>Mirrors · Light · Design</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '16px', lineHeight: '1.7', maxWidth: '300px' }}>Oglinzi personalizate din sticla si plexi, cu banda LED si grafica Instagram configurabila.</p>
            <a href="#configurator" style={{ display: 'inline-block', marginTop: '28px', backgroundColor: '#E4633E', color: '#fff', padding: '12px 24px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', textDecoration: 'none' }}>Configureaza acum</a>
          </div>

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', fontWeight: '500' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="tel:0728085494" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', letterSpacing: '0.02em' }}>0728 085 494</a>
              <a href="mailto:contact@halomirrors.ro" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>contact@halomirrors.ro</a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', fontWeight: '500' }}>Social</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="https://instagram.com/halo.mirrors" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.02em' }}>Instagram</a>
              <a href="https://tiktok.com/@halo.mirrors" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.02em' }}>TikTok</a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>© 2026 HALO MIRRORS. TOATE DREPTURILE REZERVATE.</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>ROMANIA</p>
        </div>
      </div>
    </footer>
  )
}