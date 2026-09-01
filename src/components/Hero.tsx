import RotatingDial from './RotatingDial'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-12">
        <div>
          <p className="coord-label mb-4">Design &amp; Development — Est. 2024</p>
          <h1 className="max-w-[14ch] text-5xl leading-[1.05] text-graphite md:text-6xl">
            I build interfaces the way a drafter builds a plan: measured first,
            styled second.
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-graphite/75">
            A portfolio of product design and frontend engineering work —
            dashboards, tools, and storefronts built with the same attention
            to structure as to surface.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a
              href="#work"
              className="rounded-sm bg-graphite px-6 py-3 font-body text-sm text-paper transition-colors hover:bg-rust"
            >
              See the work
            </a>
            <a href="#contact" className="font-body text-sm text-graphite/70 underline underline-offset-4 hover:text-graphite">
              Get in touch
            </a>
          </div>
        </div>
        <RotatingDial />
      </div>
    </section>
  )
}
