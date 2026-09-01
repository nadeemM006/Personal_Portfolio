import { useState, useEffect, useRef } from 'react'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const root = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={root} className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="Muhammad Nadeem">MNL<span>.</span></a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="nav-pill" href="mailto:infowithnadeem@gmail.com">Let's Talk <span>↗</span></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <i /><i />
        </button>
      </div>
    </header>
  )
}
