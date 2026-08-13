import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import HomePage from './HomePage'
import CartPage from './CartPage'
import { StickyCta } from './LandingSections'
import { TermsPage, PrivacyPage, CookiePage, ReturnPage } from './LegalPages'
import { LEGAL_LINKS } from './legalRoutes'

const LEGAL_COMPONENTS = { terms: TermsPage, privacy: PrivacyPage, cookies: CookiePage, returns: ReturnPage }

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Reset scroll position when switching between pages
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#ECEEF0] text-[#17181A]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cos" element={<CartPage />} />
        {LEGAL_LINKS.map(({ id, path }) => {
          const Component = LEGAL_COMPONENTS[id]
          return <Route key={path} path={path} element={<Component />} />
        })}
      </Routes>
      <Footer />
      {isHome && <div className="md:hidden" style={{ height: '66px', background: '#17181A' }} />}
      {isHome && <StickyCta />}
    </div>
  )
}

export default App
