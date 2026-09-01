import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.round(Math.random() * 9 + 5))
        if (next >= 100) {
          window.clearInterval(timer)
          window.setTimeout(() => setLoaded(true), 450)
        }
        return next
      })
    }, 80)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursor.current) return
      gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-reveal', { opacity: 0 }, { opacity: 1, duration: 1 })
      gsap.to('.ambient-orb', {
        yPercent: 30,
        xPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
    })
    return () => ctx.revert()
  }, [loaded])

  return (
    <>
      <div className={`preloader ${loaded ? 'is-done' : ''}`} aria-hidden={loaded}>
        <div className="preloader-inner">
          <span className="eyebrow">INITIALIZING / MUHAMMAD NADEEM</span>
          <strong>{progress}%</strong>
          <div className="preloader-line"><span style={{ width: `${progress}%` }} /></div>
          <span className="preloader-foot">AI / CODE / AUTOMATION</span>
        </div>
      </div>

      <div ref={cursor} className="cursor-orb" aria-hidden="true" />
      <div className="ambient-orb" aria-hidden="true" />

      <div className={`page-reveal ${loaded ? '' : 'page-hidden'}`}>
        <Nav />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </>
  )
}
