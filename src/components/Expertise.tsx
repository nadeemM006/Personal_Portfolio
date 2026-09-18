import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERTISE } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Expertise() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reduced-motion visitors skip the reveal — content stays visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.boot-card', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 74%', once: true },
      })
      gsap.from('.expertise-head > *', {
        y: 24, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="expertise" className="section expertise">
      <div className="shell">
        <div className="expertise-head">
          <p className="section-label">{'//'} EXPERTISE MODULES</p>
          <h2 className="section-title">What I do best.</h2>
          <p className="section-sub">
            Four disciplines, one goal — shipping software that works end to end.
          </p>
        </div>

        <div className="boot-grid">
          {EXPERTISE.map((item) => (
            <article className="boot-card" key={item.id}>
              <span className="boot-id">{'//'} {item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="boot-tag">{item.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
