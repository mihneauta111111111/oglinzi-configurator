import { useEffect, useState } from 'react'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('fadein')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100)
    const t2 = setTimeout(() => setPhase('fadeout'), 2200)
    const t3 = setTimeout(() => onDone(), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- timers must run once on mount, not restart if onDone's identity changes
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      backgroundColor: '#0A0A0A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.8s ease',
      opacity: phase === 'fadeout' ? 0 : 1,
      pointerEvents: phase === 'fadeout' ? 'none' : 'all',
    }}>
      <img
        src="/halomirrors.jpeg"
        alt="Halo Mirrors"
        style={{
          width: '200px',
          borderRadius: '12px',
          opacity: phase === 'visible' ? 1 : 0,
          transform: phase === 'visible' ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      />
    </div>
  )
}