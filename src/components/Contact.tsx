import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IDENTITY } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

interface FormState {
  first: string
  last: string
  email: string
  message: string
  consent: boolean
}

const EMPTY_FORM: FormState = { first: '', last: '', email: '', message: '', consent: false }

export default function Contact() {
  const root = useRef<HTMLElement>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  useEffect(() => {
    // Reduced-motion visitors skip the reveal — content stays visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 74%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({
        ...f,
        [key]: e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.value,
      }))

  // Live payload stream — mirrors the form on the left in real time.
  const sender = [form.first, form.last].filter(Boolean).join(' ') || 'awaiting input'
  const email = form.email || 'awaiting input'
  const message = form.message ? form.message.replace(/\n/g, '\\n') : 'awaiting input'
  const status =
    form.consent && sender !== 'awaiting input' && form.email.includes('@')
      ? 'READY TO DISPATCH'
      : 'STANDBY'

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry — ${sender}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${sender}\n${form.email}`)
    window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`
  }

  return (
    <section ref={root} id="contact" className="section contact">
      <div className="shell">
        <p className="section-label contact-reveal">{'//'} LET&rsquo;S CONNECT</p>
        <h2 className="contact-title contact-reveal">
          Let&rsquo;s Build Something <em>Exceptional.</em>
        </h2>
        <p className="contact-sub contact-reveal">
          Fill out the transmission form — or watch your live payload stream build
          itself on the left.
        </p>

        <div className="contact-grid">
          <div className="payload contact-reveal" aria-label="Live payload preview">
            <div className="payload-head">
              <span className="live-dot" aria-hidden />
              <span className="payload-mode">{'//'} LIVE DISPATCH MODE</span>
            </div>
            <pre>
              <code>
                <span className="c">{'// payload_preview.json'}</span>
                {'\n{'}
                {'\n  '}<span className="k">&quot;sender&quot;</span>{': '}<span className="s">&quot;{sender}&quot;</span>{','}
                {'\n  '}<span className="k">&quot;email&quot;</span>{': '}<span className="s">&quot;{email}&quot;</span>{','}
                {'\n  '}<span className="k">&quot;message&quot;</span>{': '}<span className="s">&quot;{message}&quot;</span>{','}
                {'\n  '}<span className="k">&quot;status&quot;</span>{': '}<span className="s2">&quot;{status}&quot;</span>
                {'\n}'}<span className="payload-cursor" aria-hidden>▌</span>
              </code>
            </pre>
          </div>

          <form className="contact-form contact-reveal" onSubmit={submit}>
            <div className="form-row">
              <label className="field">
                <span>First Name</span>
                <input value={form.first} onChange={update('first')} placeholder="Jane" required />
              </label>
              <label className="field">
                <span>Last Name</span>
                <input value={form.last} onChange={update('last')} placeholder="Doe" required />
              </label>
            </div>
            <label className="field">
              <span>Email Address</span>
              <input type="email" value={form.email} onChange={update('email')} placeholder="jane@company.com" required />
            </label>
            <label className="field">
              <span>Type your message here...</span>
              <textarea value={form.message} onChange={update('message')} placeholder="Tell me about your project..." required />
            </label>
            <label className="consent">
              <input type="checkbox" checked={form.consent} onChange={update('consent')} />
              <span>I give permission to contact me at this email address.</span>
            </label>
            <button className="btn-solid send" type="submit">
              Send Message <span aria-hidden>↗</span>
            </button>
          </form>
        </div>

        <footer className="footer-bar">
          <span>© {IDENTITY.year} {IDENTITY.name.toUpperCase()}</span>
          <div className="footer-links">
            <a href={IDENTITY.github} target="_blank" rel="noreferrer">GITHUB</a>
            <a href={IDENTITY.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a>
            <a href={`mailto:${IDENTITY.email}`}>EMAIL</a>
          </div>
          <a href="#top">BACK TO TOP ↑</a>
        </footer>
      </div>
    </section>
  )
}
