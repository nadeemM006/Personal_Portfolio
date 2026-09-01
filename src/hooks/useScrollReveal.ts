import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveals a panel by drawing its top rule and lifting its content into
 * place as it enters the viewport — one deliberate motion per project
 * panel, matching the "blueprint being laid down" concept. Not used on
 * every element; only on section-level panels.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rule = el.querySelector<HTMLElement>('[data-reveal-rule]')
    const content = el.querySelectorAll<HTMLElement>('[data-reveal-content]')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      })

      if (rule) {
        tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out', transformOrigin: 'left' })
      }
      if (content.length) {
        tl.fromTo(
          content,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
          rule ? '-=0.2' : 0,
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
