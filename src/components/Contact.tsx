export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
      <p className="coord-label mb-4">Contact</p>
      <h2 className="max-w-[16ch] text-4xl leading-tight text-graphite md:text-6xl">
        Have a project in mind? Let's talk it through.
      </h2>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <a
          href="mailto:you@example.com"
          className="w-fit rounded-sm bg-graphite px-6 py-3 font-body text-sm text-paper transition-colors hover:bg-rust"
        >
          you@example.com
        </a>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-graphite/70 underline underline-offset-4 hover:text-graphite">
            GitHub
          </a>
          <a href="#" className="text-sm text-graphite/70 underline underline-offset-4 hover:text-graphite">
            LinkedIn
          </a>
        </div>
      </div>
      <p className="coord-label mt-24">© 2026 — built with React, Tailwind &amp; GSAP</p>
    </section>
  )
}
