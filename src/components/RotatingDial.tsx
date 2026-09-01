import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const POINTS = [
  { label: 'AI', angle: -22, r: 110, offset: -6 },
  { label: 'RAG', angle: 52, r: 128, offset: 2 },
  { label: 'LLM', angle: 112, r: 96, offset: -3 },
  { label: 'Python', angle: 178, r: 130, offset: 5 },
  { label: 'React', angle: 242, r: 118, offset: -4 },
  { label: 'Node', angle: 298, r: 104, offset: 3 },
  { label: 'n8n', angle: 330, r: 140, offset: -2 },
]

export default function RotatingDial() {
  const root = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // very subtle organic motion for points
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.orbit-point').forEach((el, i) => {
        gsap.to(el, {
          x: `+=${(i % 2 === 0 ? -1 : 1) * (Math.random() * 6 + 2)}px`,
          y: `+=${(i % 3 === 0 ? -1 : 1) * (Math.random() * 4 + 1)}px`,
          duration: 6 + Math.random() * 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        })
      })
      // one very slow ring rotation (near-imperceptible)
      gsap.to(root.current, { rotate: 2.4, duration: 80, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="orbit-shell" aria-hidden>
      <svg className="orbit-svg" width="360" height="360" viewBox="0 0 360 360" aria-hidden>
        <g fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1">
          <circle cx="180" cy="180" r="158" />
          <circle cx="180" cy="180" r="112" />
          <circle cx="180" cy="180" r="72" />
        </g>
      </svg>

      <div className="orbit-core-minor">MNL<span className="core-sub">AI</span></div>

      {POINTS.map((p) => {
        const rad = (p.angle * Math.PI) / 180
        const x = 180 + Math.cos(rad) * p.r
        const y = 180 + Math.sin(rad) * p.r
        const style: React.CSSProperties = { left: x - 6, top: y - 6 }
        return (
          <div key={p.label} className="orbit-point" style={style}>
            <span className="point-dot" />
            <small className="point-label">{p.label}</small>
          </div>
        )
      })}
    </div>
  )
}
