import { useEffect, useState } from 'react'

export default function PortraitCarousel() {
  const slides = [0, 1, 2]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % slides.length), 5200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="portrait-oval" aria-hidden>
      {slides.map((i) => (
        <div key={i} className={`portrait-slide ${i === active ? 'is-active' : ''}`} style={{ backgroundPosition: `${20 * i}% 30%` }} />
      ))}
      <div className="portrait-overlay" />
    </div>
  )
}
