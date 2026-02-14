import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './SectionAccordion.module.css'

interface SectionAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  isDarkMode?: boolean
  id?: string
}

export const SectionAccordion = ({
  title,
  children,
  defaultOpen = false,
  isDarkMode = false,
  id
}: SectionAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const { hash } = useLocation()

  useEffect(() => {
    // Check if URL hash matches this accordion's ID OR a sub-section of it
    if (id) {
      const currentHash = hash.replace('#', '')
      if (currentHash === id || currentHash.startsWith(`${id}-`)) {
        setIsOpen(true)
        // Scroll only if this is the exact match
        if (currentHash === id) {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }, 200)
        }
      }
    }
  }, [id, hash])

  const toggleAccordion = () => {
    const nextOpen = !isOpen
    setIsOpen(nextOpen)

    // Update URL hash when opening accordion, but ONLY if we aren't already on a nested link
    if (nextOpen && id) {
      const currentHash = window.location.hash.replace('#', '');
      if (!currentHash.startsWith(`${id}-`)) {
        window.history.pushState(null, '', `#${id}`)
      }
    }
  }

  return (
    <div
      id={id}
      className={`${styles.accordionContainer} ${isDarkMode ? styles.darkMode : ''}`}
    >
      <button
        className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ''}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-label={`${title}. Click to ${isOpen ? 'collapse' : 'expand'} section`}
      >
        <h3 className={styles.accordionTitle}>{title}</h3>
        <span className={styles.accordionIcon}>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  )
}
