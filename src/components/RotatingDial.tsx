import { useRef, useState, useCallback } from 'react'

interface Facet {
  label: string
  detail: string
}

const FACETS: Facet[] = [
  { label: 'Design', detail: 'Interfaces & systems' },
  { label: 'Code', detail: 'React & TypeScript' },
  { label: 'Motion', detail: 'GSAP & interaction' },
  { label: 'Structure', detail: 'Layout & typography' },
  { label: 'Build', detail: 'Performance & delivery' },
  { label: 'Craft', detail: 'Detail & finish' },
]

const RADIUS = 190

/**
 * The signature moment of the page: a draggable, 360°-rotating instrument
 * standing in for a drafting compass. This is the one place the brief's
 * "3D visual design" and "360° interactive presentation" requirements are
 * spent — deliberately, rather than scattered as ambient motion elsewhere.
 */
export default function RotatingDial() {
  const [rotation, setRotation] = useState(-30)
  const dragState = useRef<{ startX: number; startRotation: number } | null>(null)
  const spinRef = useRef<number | null>(null)

  const stopAutoSpin = useCallback(() => {
    if (spinRef.current) {
      window.clearInterval(spinRef.current)
      spinRef.current = null
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    stopAutoSpin()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragState.current = { startX: e.clientX, startRotation: rotation }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return
    const delta = e.clientX - dragState.current.startX
    setRotation(dragState.current.startRotation + delta * 0.4)
  }

  const onPointerUp = () => {
    dragState.current = null
  }

  return (
    <div className="select-none">
      <div
        role="img"
        aria-label={`Interactive rotating instrument. Facets: ${FACETS.map((f) => f.label).join(', ')}.`}
        className="relative mx-auto h-[280px] w-[280px] cursor-grab touch-none active:cursor-grabbing"
        style={{ perspective: '900px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: `rotateY(${rotation}deg) rotateX(-6deg)` }}
        >
          {FACETS.map((facet, i) => {
            const angle = (360 / FACETS.length) * i
            return (
              <div
                key={facet.label}
                className="absolute inset-x-0 top-1/2 -mt-[70px] mx-auto flex h-[140px] w-[180px] flex-col items-center justify-center gap-1 rounded-sm border border-graphite/15 bg-paper/95"
                style={{
                  left: '50%',
                  marginLeft: '-90px',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <span className="font-display text-lg text-graphite">{facet.label}</span>
                <span className="coord-label">{facet.detail}</span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="coord-label mt-4 text-center">drag to rotate — 6 facets</p>
    </div>
  )
}
