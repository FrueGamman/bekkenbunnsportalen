"use client"
import { useState } from "react"
import { ImageLightbox } from "./ImageLightbox"
import styles from "./ClickableImage.module.css"

interface ClickableImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  enlargeable?: boolean
  loading?: "lazy" | "eager"
}

export const ClickableImage = ({ 
  src, 
  alt, 
  caption, 
  className = "", 
  enlargeable = true,
  loading = "lazy" 
}: ClickableImageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleImageClick = () => {
    if (enlargeable) {
      setIsLightboxOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (enlargeable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      setIsLightboxOpen(true)
    }
  }

  return (
    <>
      <div 
        className={`${styles.imageWrapper} ${enlargeable ? styles.clickable : ''} ${className}`}
        onClick={handleImageClick}
        onKeyDown={handleKeyDown}
        role={enlargeable ? "button" : undefined}
        tabIndex={enlargeable ? 0 : undefined}
        aria-label={enlargeable ? `Click to enlarge: ${alt}` : undefined}
      >
        <img 
          src={src} 
          alt={alt}
          className={styles.image}
          loading={loading}
        />
        {enlargeable && (
          <div className={styles.enlargeIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        {caption && (
          <p className={styles.caption}>{caption}</p>
        )}
      </div>

      {enlargeable && (
        <ImageLightbox 
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          imageSrc={src}
          imageAlt={alt}
          caption={caption}
        />
      )}
    </>
  )
}

