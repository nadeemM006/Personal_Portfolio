import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IDENTITY, ABOUT_CARDS, ABOUT_PARAGRAPH } from '../data/portfolio'
import Portrait from './Portrait'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reduced-motion visitors skip the reveal — content stays visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 34, opacity: 0, stagger: 0.09, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="section about">
      <div className="shell about-grid">
        <div className="about-photo about-reveal">
          <Portrait tag="// PROFILE.SYS" />
          <div className="about-status">
            <span className="status-badge"><i /> {IDENTITY.status.toUpperCase()}</span>
            <span className="status-year">{IDENTITY.year}</span>
          </div>
        </div>

        <div className="about-copy">
          <p className="section-label about-reveal">{'//'} SYSTEM PROFILE</p>
          <h2 className="about-title about-reveal">
            Hello, I&rsquo;m <em>{IDENTITY.name}</em>
          </h2>
          <p className="about-paragraph about-reveal">{ABOUT_PARAGRAPH}</p>

          <div className="about-cards">
            {ABOUT_CARDS.map((card) => (
              <div className="about-card about-reveal" key={card.title}>
                <b>{card.title}</b>
                <span>{card.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
