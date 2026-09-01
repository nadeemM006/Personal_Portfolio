import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILL_GROUPS = [
  { label: 'LANGUAGES', items: ['Python', 'C++', 'JavaScript', 'SQL'] },
  { label: 'AI & DATA', items: ['Generative AI', 'RAG', 'Prompt Engineering', 'LLMs', 'Embeddings', 'Vector Databases'] },
  { label: 'WEB DEVELOPMENT', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'REST APIs'] },
  { label: 'TOOLS & PLATFORMS', items: ['Git', 'GitHub', 'VS Code', 'n8n', 'Streamlit', 'Supabase', 'PostgreSQL', 'Pinecone', 'Ollama'] },
]

export default function About() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-word', {
        yPercent: 100, opacity: 0, stagger: .05, duration: .8, ease: 'power4.out',
        scrollTrigger: { trigger: '.manifesto', start: 'top 75%', once: true }
      })
      gsap.from('.skill-chip', {
        y: 25, opacity: 0, stagger: .025, duration: .5, ease: 'power3.out',
        scrollTrigger: { trigger: '#skills', start: 'top 78%', once: true }
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="about">
      <div id="expertise" className="manifesto section-shell">
        <span className="eyebrow">02 / ABOUT</span>
        <div className="manifesto-copy">
          {['Ideas', 'into', 'AI-powered', 'products.'].map((word, i) => (
            <span key={word} className="manifesto-line"><span className="manifesto-word">{word}</span>{i < 3 && <small>↗</small>}</span>
          ))}
        </div>
        <p className="manifesto-desc">
          I’m a BS Artificial Intelligence student focused on building practical AI-powered applications and full-stack solutions. I enjoy turning ideas into working products while continuously learning AI, machine learning, web development, and automation.
        </p>
      </div>

      <div id="skills" className="skills-band section-shell">
        <div className="skills-title"><span className="eyebrow">03 / TECHNOLOGIES</span><h2>My <em>stack.</em></h2></div>
        <div className="skills-groups">
          {SKILL_GROUPS.map((group) => (
            <div className="skill-group" key={group.label}>
              <span className="skill-group-label">{group.label}</span>
              <div className="skills-cloud">
                {group.items.map((skill, i) => <span className="skill-chip" key={skill} style={{ transform: `rotate(${i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0}deg)` }}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
