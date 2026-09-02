import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STACK } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reduced-motion visitors skip the reveal — content stays visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.stack-tag', {
        y: 22, opacity: 0, stagger: 0.02, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="skills" className="section skills">
      <div className="shell">
        <p className="section-label">A TECHNICAL STACK</p>
        <h2 className="section-title">Technologies I Work With</h2>
        <p className="section-sub">
          Full-stack expertise across modern web development, artificial intelligence,
          and automation — the tools I reach for to ship real products.
        </p>

        <div className="stack-grid">
          {STACK.map((tag) => (
            <span className="stack-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
