import { useEffect, useState } from 'react'
import { IDENTITY } from '../data/portfolio'

/**
 * The hero portrait uses the photo supplied in the public directory. The
 * fallback remains available while the image is loading or unavailable.
 */
const PORTRAIT_SRC = '/1788329971609 (3) (1).png'

export default function Portrait({ tag }: { tag: string }) {
  const [hasPhoto, setHasPhoto] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.onerror = () => setHasPhoto(false)
    img.src = PORTRAIT_SRC

    return () => {
      // nothing to clean for Image
    }
  }, [])

  useEffect(() => {
    // Add a global class so the hero can render a subtle background
    // using the same portrait image when it exists.
    if (hasPhoto) document.body.classList.add('has-portrait')
    else document.body.classList.remove('has-portrait')
    return () => { document.body.classList.remove('has-portrait') }
  }, [hasPhoto])

  return (
    <div className="portrait" aria-label={`Portrait of ${IDENTITY.name}`}>
      <div className="portrait-glow" aria-hidden />

      <div className="portrait-image" aria-hidden>
        {hasPhoto ? (
          <svg
            className="portrait-img"
            viewBox="0 0 772 1115"
            preserveAspectRatio="xMidYMin slice"
            aria-hidden="true"
          >
            <defs>
              <filter id="portrait-background-cutout" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 3"
                />
              </filter>
            </defs>
            <image
              href={PORTRAIT_SRC}
              width="772"
              height="1115"
              filter="url(#portrait-background-cutout)"
            />
          </svg>
        ) : (
          <div className="portrait-placeholder" aria-hidden>
            <div className="pa-rim" />
            <div className="pa-head" />
            <div className="pa-body" />
          </div>
        )}
      </div>

      <span className="portrait-tag" aria-hidden>{tag}</span>
    </div>
  )
}
