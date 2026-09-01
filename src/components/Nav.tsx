const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#top" className="font-display text-lg text-graphite">
        Your Name
      </a>
      <nav className="flex gap-6">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-sm text-graphite/70 transition-colors hover:text-graphite"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
