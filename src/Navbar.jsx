import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from './CartContext'

const NAV_LINKS = [
  { label: 'Galerie', id: 'galerie' },
  { label: 'Cum functioneaza', id: 'proces' },
  { label: 'Intrebari', id: 'faq' },
]

// Lightweight search index over the page's sections + gallery examples.
// Keep in sync with the section ids used in HomePage.jsx.
const SEARCH_INDEX = [
  { label: 'Configureaza-ti oglinda', tag: 'Configurator', id: 'configurator' },
  { label: 'Preturi si marimi', tag: 'Configurator', id: 'configurator' },
  { label: 'Culoare LED', tag: 'Configurator', id: 'configurator' },
  { label: 'Galerie / creatii recente', tag: 'Galerie', id: 'galerie' },
  { label: 'Cum functioneaza', tag: 'Proces', id: 'proces' },
  { label: 'Intrebari frecvente', tag: 'FAQ', id: 'faq' },
  { label: 'Livrare in toata tara', tag: 'FAQ', id: 'faq' },
  { label: 'Timp de productie', tag: 'FAQ', id: 'faq' },
  { label: 'halo.mirrors', tag: 'Exemplu', id: 'galerie' },
  { label: 'rheearoses', tag: 'Exemplu', id: 'galerie' },
  { label: 'domeniulterraqua', tag: 'Exemplu', id: 'galerie' },
  { label: 'primegraduateevents', tag: 'Exemplu', id: 'galerie' },
]

function SearchIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="7.3" /><line x1="16" y1="16" x2="21" y2="21" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [openResults, setOpenResults] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const boxRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useCart()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 90)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickAway = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpenResults(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return SEARCH_INDEX.filter(
      (r) => r.label.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [query])

  function goTo(id) {
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goHome = () => {
    if (!isHome) navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pick = (id) => {
    goTo(id)
    setQuery('')
    setOpenResults(false)
    setMenuOpen(false)
    setActive(-1)
  }

  const onKeyDown = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i - 1 + results.length) % results.length) }
    else if (e.key === 'Enter') { e.preventDefault(); pick(results[active >= 0 ? active : 0].id) }
    else if (e.key === 'Escape') { setOpenResults(false) }
  }

  const solid = scrolled || menuOpen || !isHome
  const text = solid ? '#17181A' : '#ffffff'
  const subtext = solid ? 'rgba(23,24,26,0.55)' : 'rgba(255,255,255,0.75)'
  const fieldBg = solid ? '#E3E6E9' : 'rgba(255,255,255,0.14)'
  const fieldBorder = solid ? 'rgba(23,24,26,0.08)' : 'rgba(255,255,255,0.35)'

  const cartButton = (
    <button type="button" onClick={() => navigate('/cos')} aria-label="Cosul tau" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: text, padding: '4px', display: 'flex', alignItems: 'center' }}>
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {count > 0 && (
        <span style={{ position: 'absolute', top: '-3px', right: '-4px', minWidth: '17px', height: '17px', padding: '0 4px', borderRadius: '999px', background: '#9B7BFF', color: '#fff', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>{count}</span>
      )}
    </button>
  )

  const searchField = (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: fieldBg, border: `1px solid ${fieldBorder}`, borderRadius: '999px', padding: '8px 14px', backdropFilter: solid ? 'none' : 'blur(6px)' }}>
        <SearchIcon color={subtext} />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpenResults(true); setActive(-1) }}
          onFocus={() => setOpenResults(true)}
          onKeyDown={onKeyDown}
          placeholder="Cauta pe site..."
          aria-label="Cauta pe site"
          style={{ background: 'transparent', border: 'none', outline: 'none', color: text, fontSize: '13px', width: '100%', minWidth: '150px' }}
        />
      </div>
      {openResults && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: '14px', boxShadow: '0 18px 40px -12px rgba(23,24,26,0.28)', border: '1px solid rgba(23,24,26,0.06)', overflow: 'hidden', zIndex: 60 }}>
          {results.map((r, i) => (
            <button
              key={r.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(r.id)}
              style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '10px 14px', textAlign: 'left', background: active === i ? '#EEF0F2' : 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '13px', color: '#17181A' }}>{r.label}</span>
              <span style={{ fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9B7BFF', fontWeight: 600 }}>{r.tag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <header
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'background 0.3s ease, box-shadow 0.3s ease', background: solid ? 'rgba(236,238,240,0.92)' : 'linear-gradient(to bottom, rgba(10,11,13,0.34), rgba(10,11,13,0))', backdropFilter: solid ? 'blur(10px)' : 'none', boxShadow: solid ? '0 1px 0 rgba(23,24,26,0.06)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-6" style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <button type="button" onClick={goHome} className="font-display" style={{ fontSize: '18px', fontWeight: 500, color: text, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
          halo.mirrors
        </button>

        {/* Desktop */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '220px' }}>{searchField}</div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} type="button" onClick={() => goTo(l.id)} style={{ fontSize: '13.5px', color: text, background: 'none', border: 'none', cursor: 'pointer', opacity: 0.9 }}>
                {l.label}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => goTo('configurator')} className="cta-glow" style={{ background: '#17181A', color: '#fff', borderRadius: '999px', padding: '9px 18px', fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Configureaza
          </button>
          {cartButton}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center" style={{ gap: '14px' }}>
          {cartButton}
          <button type="button" aria-label="Meniu" onClick={() => setMenuOpen((v) => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: text, padding: '6px' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? (<><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>)
                : (<><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="13" x2="20" y2="13" /><line x1="4" y1="18" x2="20" y2="18" /></>)}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="md:hidden" style={{ background: 'rgba(236,238,240,0.98)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(23,24,26,0.06)', padding: '16px 24px 24px' }}>
          <div style={{ marginBottom: '14px' }}>{searchField}</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} type="button" onClick={() => { goTo(l.id); setMenuOpen(false) }} style={{ textAlign: 'left', fontSize: '15px', color: '#17181A', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0' }}>
                {l.label}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => { goTo('configurator'); setMenuOpen(false) }} className="cta-glow" style={{ marginTop: '10px', width: '100%', background: '#17181A', color: '#fff', borderRadius: '999px', padding: '12px', fontSize: '14px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Configureaza oglinda
          </button>
        </div>
      )}
    </header>
  )
}
