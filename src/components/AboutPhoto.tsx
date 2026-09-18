import { useEffect, useState } from 'react'
import { IDENTITY } from '../data/portfolio'

/**
 * Standalone photo for the About section. Independent of the Hero
 * portrait on purpose — swapping or removing this image never touches
 * the Hero.
 *
 * Drop a photo at /public/about-photo.jpg (or .png) to show it. Until
 * then, a placeholder card renders so the layout never breaks.
 */
const ABOUT_PHOTO_SRC = '/about-photo.jpg'

export default function AboutPhoto() {
  const [hasPhoto, setHasPhoto] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.onerror = () => setHasPhoto(false)
    img.src = ABOUT_PHOTO_SRC
  }, [])

  return (
    <div className="about-portrait">
      {hasPhoto ? (
        <img
          className="about-portrait-img"
          src={ABOUT_PHOTO_SRC}
          alt={`Portrait of ${IDENTITY.name}`}
          loading="lazy"
        />
      ) : (
        <div className="about-portrait-placeholder" aria-hidden>
          <div className="ap-rim" />
          <div className="ap-head" />
          <div className="ap-body" />
        </div>
      )}
    </div>
  )
}
