import { useEffect } from "react"
import styles from "./ImageModal.module.css"

interface ImageModalProps {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  onClose: () => void
}

export const ImageModal = ({ isOpen, imageSrc, imageAlt, onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      className={styles.modalOverlay}
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClose(); }}
      role="dialog"
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      aria-modal="true"
      aria-label={imageAlt}
    >
      <div // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <img src={imageSrc} alt={imageAlt} className={styles.modalImage} />
      </div>
    </div>
  )
}

