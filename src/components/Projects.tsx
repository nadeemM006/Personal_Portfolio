import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import { IDENTITY } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    // Reduced-motion visitors skip the reveal — content stays visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.proj-card', {
        y: 44, opacity: 0, stagger: 0.09, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 80%', once: true },
      })
      gsap.from('.proj-head > *', {
        y: 26, opacity: 0, stagger: 0.09, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="work" className="section projects">
      <div className="shell">
        <div className="proj-head">
          <p className="section-label"><i className="label-sq" aria-hidden /> PORTFOLIO WORK</p>
          <h2 className="proj-title" data-text="Featured Engineering Projects">
            Featured Engineering Projects
          </h2>
        </div>

        <div className="proj-grid">
          {projects.map((project) => (
            <article className="proj-card" key={project.id}>
              <span className="proj-idx">{'//'} PROJECT #{project.index}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="proj-tags">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="proj-meta">
                <span>{project.stack[0].toUpperCase()} | FEATURED</span>
                <a href={IDENTITY.github} target="_blank" rel="noreferrer">
                  View <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
