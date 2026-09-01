import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title span', {
        yPercent: 110, opacity: 0, stagger: .06, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} id="contact" className="contact">
      <div className="section-shell contact-inner">
        <span className="eyebrow">05 / CONTACT</span>
        <h2 className="contact-title">
          <span>Let's build</span>
          <span className="accent-text">something useful.</span>
        </h2>
        <div className="contact-row">
          <a className="contact-mail" href="mailto:infowithnadeem@gmail.com">infowithnadeem@gmail.com <span>↗</span></a>
          <div className="socials">
            <a href="https://github.com/nadeemM006" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/muhammad-nadeem-240546389" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <div className="footer-meta"><span>© 2026 MUHAMMAD NADEEM</span><span>AI / FULL-STACK / AUTOMATION</span><a href="#top">BACK TO TOP ↑</a></div>
      </div>
    </footer>
  )
}
