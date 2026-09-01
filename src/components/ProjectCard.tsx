import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="border-t border-line py-14 md:py-20">
      <div
        data-reveal-rule
        className="h-[2px] w-full origin-left"
        style={{ backgroundColor: project.color }}
      />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[80px_1fr_1fr]">
        <span data-reveal-content className="coord-label">
          {project.index}
        </span>
        <div data-reveal-content>
          <h3 className="text-3xl text-graphite md:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-prose leading-relaxed text-graphite/75">{project.summary}</p>
        </div>
        <div data-reveal-content className="flex flex-col gap-3 md:items-end md:text-right">
          <span className="coord-label">{project.year}</span>
          <span className="text-sm text-graphite/70">{project.role}</span>
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-graphite/15 px-2 py-1 font-mono text-[11px] text-graphite/60"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
