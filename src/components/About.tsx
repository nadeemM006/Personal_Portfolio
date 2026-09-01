const SKILLS = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 & CSS3'] },
  { group: 'Motion', items: ['GSAP', 'Scroll-driven animation', 'Micro-interactions'] },
  { group: 'Design', items: ['Figma', 'Design systems', 'Responsive UX'] },
]

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-graphite py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-[1fr_1fr] md:px-12">
        <div>
          <p className="coord-label mb-4 text-paper/50">About</p>
          <h2 className="max-w-[14ch] text-4xl leading-tight md:text-5xl">
            Equal parts drafting table and code editor.
          </h2>
          <p className="mt-6 max-w-prose leading-relaxed text-paper/75">
            I work across design and development, which means I usually
            design with the constraints of the build already in mind — and
            build with an eye for the details a designer would notice.
            Replace this paragraph with two or three sentences about your
            own path, focus, and what you're looking for next.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {SKILLS.map((group) => (
            <div key={group.group}>
              <p className="coord-label mb-3 text-paper/50">{group.group}</p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-paper/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
