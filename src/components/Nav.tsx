import { useState, useEffect } from 'react'
import { NAV_LINKS, IDENTITY } from '../data/portfolio'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label={`${IDENTITY.name} — home`}>
        {IDENTITY.brand}
      </a>

      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="hire-pill" href="#contact">Hire Me</a>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <i /><i />
        </button>
      </div>
    </header>
  )
}
