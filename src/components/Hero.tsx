import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_PHRASES, IDENTITY } from '../data/portfolio'
import Portrait from './Portrait'

gsap.registerPlugin(ScrollTrigger)

/**
 * The hero is a 3-viewport track with a sticky child — the "scroll to
 * scrub timeline" hold from the reference design. Scrolling swaps the
 * oversized headline phrases and the right-hand meta block.
 *
 * The sticky hold engages only when the hero content fits the viewport
 * (measured after fonts settle, re-checked on resize); otherwise the hero
 * flows naturally and phrases swap across its own height — so every
 * phrase stays reachable on any screen.
 *
 * Reduced-motion visitors get the same layout, but phrases swap instantly
 * via a native scroll listener — no animation loop involved.
 */
export default function Hero({ active }: { active: boolean }) {
  const root = useRef<HTMLElement>(null)
  const sticky = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [holds, setHolds] = useState(false)

  // Can the sticky hold engage? Only if the hero content fits the viewport.
  useEffect(() => {
    const check = () =>
      setHolds(!!sticky.current && sticky.current.scrollHeight <= window.innerHeight + 8)
    check()
    window.addEventListener('resize', check)
    document.fonts?.ready.then(check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!active || !root.current) return
    const el = root.current
    const clampIdx = (progress: number) =>
      setIdx(
        Math.min(HERO_PHRASES.length - 1, Math.floor(progress * HERO_PHRASES.length))
      )

    // Reduced motion — no GSAP. A native scroll listener swaps phrases
    // instantly, so nothing depends on the animation loop.
    if (reduced) {
      const update = () => {
        const total = el.offsetHeight - window.innerHeight
        if (total <= 0) return
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
        clampIdx(scrolled / total)
      }
      update()
      window.addEventListener('scroll', update, { passive: true })
      return () => window.removeEventListener('scroll', update)
    }

    const ctx = gsap.context(() => {
      const phrases = gsap.utils.toArray<HTMLElement>('.hero-phrase')
      const metas = gsap.utils.toArray<HTMLElement>('.hero-meta')

      // Entrance sequence (runs once the preloader lifts).
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro.from('.hero-hi', { y: 14, opacity: 0, duration: 0.5 }, 0.05)
      if (phrases[0]) {
        intro.from(phrases[0].querySelectorAll('.line'), {
          yPercent: 115, duration: 0.85, stagger: 0.09, ease: 'power4.out',
        }, 0.15)
      }
      intro.from('.hero-portrait', { opacity: 0, scale: 0.95, y: 24, duration: 0.9, ease: 'power2.out' }, 0.3)
      if (metas[0]) intro.from(metas[0], { y: 16, opacity: 0, duration: 0.55 }, 0.45)
      intro.from('.hero-foot > *', { y: 14, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.6)

      // Scrubbed timeline across the hero track — from its top hitting the
      // viewport top until its bottom hits the viewport bottom. The sticky
      // child provides the visual hold; no GSAP pinning involved.
      const SEG = 1.2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => clampIdx(self.progress),
        },
      })

      for (let i = 1; i < phrases.length; i++) {
        const t = (i - 1) * SEG
        const out = phrases[i - 1]
        const inn = phrases[i]
        tl.to(out.querySelectorAll('.line'), { yPercent: -120, duration: 0.45, ease: 'power2.in', stagger: 0.04 }, t)
        tl.to(out, { autoAlpha: 0, duration: 0.25 }, t + 0.35)
        tl.to(metas[i - 1], { autoAlpha: 0, y: -16, duration: 0.3, ease: 'power2.in' }, t + 0.05)
        tl.set([inn, metas[i]], { autoAlpha: 1 }, t + 0.55)
        tl.fromTo(inn.querySelectorAll('.line'), { yPercent: 120 }, { yPercent: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 }, t + 0.55)
        tl.fromTo(metas[i], { y: 16 }, { y: 0, duration: 0.4, ease: 'power2.out' }, t + 0.55)
      }

      // Portrait slowly pushes in across the whole scrub.
      tl.fromTo('.hero-portrait', { y: 0, scale: 1 }, { y: -26, scale: 1.05, ease: 'none', duration: (phrases.length - 1) * SEG }, 0)
    }, root)

    return () => ctx.revert()
  }, [active, reduced])

  // AUTOPLAY: when user is not scrolling and reduced-motion is false,
  // advance phrases automatically with a restrained animation.
  useEffect(() => {
    if (!active || reduced) return
    let mounted = true
    const animRef = { busy: false }
    const playNext = () => {
      if (!mounted || animRef.busy) return
      if (window.scrollY > 80) return // avoid conflict with user scroll
      const next = (idx + 1) % HERO_PHRASES.length
      const phrases = Array.from(document.querySelectorAll('.hero-phrase')) as HTMLElement[]
      const metas = Array.from(document.querySelectorAll('.hero-meta')) as HTMLElement[]
      const out = phrases[idx]
      const inn = phrases[next]
      if (!out || !inn) { setIdx(next); return }
      animRef.busy = true
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(out.querySelectorAll('.line'), { yPercent: -120, duration: 0.45, stagger: 0.04 })
      tl.to(out, { autoAlpha: 0, duration: 0.2 }, '-=0.15')
      tl.to(metas[idx], { autoAlpha: 0, y: -12, duration: 0.28 }, '-=0.2')
      tl.set([inn, metas[next]], { autoAlpha: 1 })
      tl.fromTo(inn.querySelectorAll('.line'), { yPercent: 120 }, { yPercent: 0, duration: 0.5, stagger: 0.05 })
      tl.fromTo(metas[next], { y: 12 }, { y: 0, duration: 0.36 }, '-=0.45')
      tl.call(() => { setIdx(next); animRef.busy = false })
    }

    const interval = setInterval(playNext, 4800)
    return () => { mounted = false; clearInterval(interval) }
  }, [active, reduced, idx])

  // Toggling the hold changes the section height — recalc trigger positions.
  useEffect(() => {
    if (!active) return
    ScrollTrigger.refresh()
  }, [holds, active])

  const pad = (n: number) => String(n).padStart(2, '0')
  const progress = HERO_PHRASES.length > 1 ? idx / (HERO_PHRASES.length - 1) : 1

  return (
    <section
      ref={root}
      id="top"
      className={`hero ${holds ? 'hero--hold' : ''} ${reduced ? 'hero--discrete' : ''}`}
      aria-label="Introduction"
    >
      <div ref={sticky} className="hero-sticky">
        <div className="hero-glow" aria-hidden />

        <h1 className="sr-only">
          {IDENTITY.name} — {IDENTITY.role}
        </h1>

        <div className="hero-inner">
          <div className="hero-left">
            <p className="hero-hi">Hi, I&rsquo;m {IDENTITY.name}</p>
            <div className="hero-titles">
              {HERO_PHRASES.map((phrase, i) => (
                <div
                  className={`hero-phrase ${i === 0 ? 'is-first' : ''} ${i === idx ? 'is-active' : ''}`}
                  key={phrase.lines.join(' ')}
                  aria-hidden={i !== idx}
                >
                  {phrase.lines.map((line) => (
                    <span className="big-line-wrap" key={line}>
                      <span className="line">{line}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-portrait">
            {/* temporary portrait placeholder (uses /public/portrait.jpg when available) */}
            <Portrait tag="// AI / FULL-STACK" />
          </div>

          <div className="hero-right">
            <div className="hero-metas">
              {HERO_PHRASES.map((phrase, i) => (
                <div
                  className={`hero-meta ${i === 0 ? 'is-first' : ''} ${i === idx ? 'is-active' : ''}`}
                  key={phrase.meta}
                >
                  <p className="hero-meta-label">{'//'} {phrase.meta}</p>
                  <p className="hero-meta-copy">{phrase.copy}</p>
                  <p className="hero-meta-year">{phrase.year} — {IDENTITY.location.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-foot">
          <div className="scrub-cue" aria-hidden={HERO_PHRASES.length < 2}>
            <span className="scrub-star">✦</span>
            <span className="scrub-label">SCROLL TO SCRUB TIMELINE</span>
            <span className="scrub-count">{pad(idx + 1)} / {pad(HERO_PHRASES.length)}</span>
            <span className="scrub-bar"><i style={{ transform: `scaleX(${progress})` }} /></span>
          </div>
          <div className="hero-ctas">
            <a className="btn-solid" href="#work">View My Work <span aria-hidden>↗</span></a>
            <a className="btn-ghost" href="#contact">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  )
}
