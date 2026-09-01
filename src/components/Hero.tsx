import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RotatingDial from './RotatingDial'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Entrance: very restrained sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-kicker', { y: 8, opacity: 0, duration: 0.32 }, 0.08)

      if (!prefersReduced) {
        tl.from('.hero-title .line', { yPercent: 100, opacity: 0, stagger: 0.14, duration: 0.66 }, 0.18)
      } else {
        tl.to('.hero-title .line', { opacity: 1, duration: 0.08 }, 0.18)
      }

      tl.from('.hero-role', { y: 10, opacity: 0, duration: 0.38 }, 0.46)
      tl.from('.hero-copy', { y: 8, opacity: 0, duration: 0.38 }, 0.58)
      tl.from('.hero-ctas', { y: 6, opacity: 0, duration: 0.36 }, 0.7)

      // orbit: very subtle reveal
      if (!prefersReduced) tl.from('.tech-orbit', { opacity: 0, scale: 0.996, duration: 0.9 }, 0.9)

      // Subtle organic drift for elements inside orbit handled inside RotatingDial

      // Scroll: subtle upward movement and fade for typography and visual system
      if (!prefersReduced && root.current) {
        gsap.to(root.current.querySelectorAll('.hero-title, .hero-copy'), {
          y: -20, opacity: 0.92, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
        gsap.to('.tech-orbit', {
          y: -18, x: 6, opacity: 0.94,
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      }

      // only the orbit responds subtly to mouse movement
      const onMove = (e: MouseEvent) => {
        if (prefersReduced) return
        const w = window.innerWidth
        const h = window.innerHeight
        const nx = (e.clientX / w - 0.5)
        const ny = (e.clientY / h - 0.5)
        gsap.to('.tech-orbit', { x: nx * 8, y: ny * 6, duration: 0.9, ease: 'power3.out' })
      }
      window.addEventListener('mousemove', onMove)

      return () => window.removeEventListener('mousemove', onMove)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="top" className="hero section-shell" aria-labelledby="hero-heading">
      <div className="hero-noise" aria-hidden />
      <div className="hero-grid" aria-hidden />

      <div className="hero-layout">
        <div className="hero-copy-wrap">
          <p className="eyebrow hero-kicker"><span className="live-dot" /> AI / FULL-STACK / CREATIVE DEVELOPMENT</p>

          <h1 ref={titleRef} id="hero-heading" className="hero-title" aria-label="Muhammad Nadeem">
            <span className="line-wrap"><span className="line">Muhammad</span></span>
            <span className="line-wrap"><span className="line muted">Nadeem</span></span>
          </h1>

          <div className="hero-role" aria-hidden>
            <span className="eyebrow" style={{ display: 'inline-block', marginTop: 8 }}>BS Artificial Intelligence Student</span>
            <div style={{ height: 6 }} />
            <span className="eyebrow" style={{ display: 'inline-block' }}>AI & Full-Stack Developer</span>
          </div>

          <p className="hero-copy" style={{ maxWidth: 360 }}>
            Building practical AI-powered applications and full-stack solutions.
          </p>

          <div className="hero-ctas">
            <a className="hero-link" href="#work">View selected work <span className="arrow">↗</span></a>
            <a className="hero-link" href="mailto:infowithnadeem@gmail.com">Let's talk <span className="arrow">↗</span></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="tech-orbit" aria-hidden>
            <RotatingDial />
          </div>
        </div>
      </div>
    </section>
  )
}

