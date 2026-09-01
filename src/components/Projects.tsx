import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-10 md:px-12">
      <p className="coord-label mb-2">Selected work — 3 of 3</p>
      <h2 className="max-w-[16ch] text-4xl text-graphite md:text-5xl">Case studies</h2>
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
