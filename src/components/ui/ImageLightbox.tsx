"use client"
import { useEffect } from "react"
import styles from "./ImageLightbox.module.css"

interface ImageLightboxProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  caption?: string
}

export const ImageLightbox = ({ isOpen, onClose, imageSrc, imageAlt, caption }: ImageLightboxProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className={styles.lightboxOverlay} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged image: ${imageAlt}`}
    >
      <button 
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className={styles.lightboxContent}>
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className={styles.lightboxImage}
        />
        {caption && (
          <p className={styles.lightboxCaption}>{caption}</p>
        )}
      </div>
    </div>
  )
}

