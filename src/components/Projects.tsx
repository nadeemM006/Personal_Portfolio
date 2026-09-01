import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-panel').forEach((panel, i) => {
        gsap.from(panel.querySelector('.project-art'), {
          scale: .78, rotate: i % 2 ? 3 : -3, opacity: 0,
          scrollTrigger: { trigger: panel, start: 'top 78%', end: 'top 35%', scrub: 1 },
        })
        gsap.from(panel.querySelectorAll('.project-reveal'), {
          y: 45, opacity: 0, stagger: .08,
          scrollTrigger: { trigger: panel, start: 'top 72%', once: true },
          duration: .8, ease: 'power3.out',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="work" className="projects section-shell">
      <div className="section-heading">
        <div><span className="eyebrow">04 / SELECTED PROJECTS</span><h2>Things <em>I</em> build.</h2></div>
        <p>I explore AI, automation, full-stack development and practical digital products — turning ideas into useful software.</p>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <article className="project-panel" key={project.id}>
            <div className="project-index">{project.index}</div>
            <div className="project-art" style={{ ['--accent' as string]: project.color }}>
              <div className="art-window">
                <div className="art-bar"><span /><span /><span /></div>
                <div className="art-content">
                  <div className="art-chart" />
                  <div className="art-cards"><i /><i /><i /></div>
                  <div className="art-lines"><b /><b /><b /><b /></div>
                </div>
              </div>
            </div>
            <div className="project-info">
              <span className="eyebrow project-reveal">{project.year} / {project.role}</span>
              <h3 className="project-reveal">{project.title}</h3>
              <p className="project-reveal">{project.summary}</p>
              <div className="tag-row project-reveal">
                {project.stack.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <a className="project-link project-reveal" href="#contact">Explore project <span>↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
