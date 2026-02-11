"use client"

import { useEffect, useState } from "react"
import { AudioReader as FloatingAudioReader } from "./AudioReader/AudioReader"
import { useTheme } from "../context/ThemeContext"
import styles from "./AccessibilityButton.module.css"

type TextScale = "normal" | "large" | "xlarge"

const TEXT_SCALE_CLASS: Record<TextScale, string> = {
  normal: "text-scale-normal",
  large: "text-scale-large",
  xlarge: "text-scale-xlarge",
}

export const AccessibilityButton = () => {
  const { theme, contrast, setTheme, setContrast } = useTheme()
  const [open, setOpen] = useState(false)
  const [textScale, setTextScale] = useState<TextScale>("normal")
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [floatingReaderEnabled, setFloatingReaderEnabled] = useState<boolean>(false)

  useEffect(() => {
    try {
      const savedScale = (localStorage.getItem("a11y_text_scale") as TextScale) || "normal"
      const savedMotion = localStorage.getItem("a11y_reduced_motion") === "true"
      const savedFloatingReader = localStorage.getItem("a11y_floating_reader") === "true"
      setTextScale(savedScale)
      setReducedMotion(savedMotion)
      setFloatingReaderEnabled(savedFloatingReader)

      const root = document.documentElement
      root.classList.remove("text-scale-normal", "text-scale-large", "text-scale-xlarge")
      root.classList.add(TEXT_SCALE_CLASS[savedScale])
      root.classList.toggle("reduced-motion", savedMotion)
    } catch {
      void 0
    }
  }, [])

  const applyTextScale = (scale: TextScale) => {
    setTextScale(scale)
    try {
      localStorage.setItem("a11y_text_scale", scale)
    } catch {
      void 0
    }
    const root = document.documentElement
    root.classList.remove("text-scale-normal", "text-scale-large", "text-scale-xlarge")
    root.classList.add(TEXT_SCALE_CLASS[scale])
  }

  const applyReducedMotion = (value: boolean) => {
    setReducedMotion(value)
    try {
      localStorage.setItem("a11y_reduced_motion", String(value))
    } catch {
      void 0
    }
    const root = document.documentElement
    root.classList.toggle("reduced-motion", value)
  }

  const applyFloatingReader = (value: boolean) => {
    setFloatingReaderEnabled(value)
    try {
      localStorage.setItem("a11y_floating_reader", String(value))
    } catch {
      void 0
    }
  }

  // Handle keyboard navigation for accessibility panel
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return

      if (event.key === 'Escape') {
        setOpen(false)
        // Return focus to the FAB button
        const fabButton = document.querySelector(`.${styles.fab}`) as HTMLButtonElement
        if (fabButton) {
          fabButton.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, styles.fab])

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-controls="a11y-panel"
        aria-label="Accessibility options"
      >
        <span aria-hidden="true">
          <img
            src="/icons8-woman-in-manual-wheelchair-48.png"
            alt=""
            className={styles.fabIcon}
          />
        </span>
      </button>

      {open && (
        <div 
          id="a11y-panel" 
          className={styles.panel} 
          role="dialog" 
          aria-label="Accessibility controls"
          aria-modal="true"
        >
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.iconPrimary} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 1 0 0 20V2Z" fill="currentColor"/>
                  <path d="M12 2v20a10 10 0 0 0 0-20Z" fill="currentColor" opacity=".25"/>
                </svg>
              </span>
              Contrast
            </div>
            <div className={styles.row}>
              <button
                className={`${styles.control} ${contrast === "normal" ? styles.active : ""}`}
                onClick={() => setContrast("normal")}
                aria-pressed={contrast === "normal"}
                aria-label="Set contrast to normal"
              >Normal</button>
              <button
                className={`${styles.control} ${contrast === "high" ? styles.active : ""}`}
                onClick={() => setContrast("high")}
                aria-pressed={contrast === "high"}
                aria-label="Set contrast to high"
              >High</button>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.iconPrimary} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm9-5a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.95 6.536a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.415l.707.708a1 1 0 0 1 0 1.414ZM7.172 6.879a1 1 0 0 1-1.415 0l-.707-.707A1 1 0 0 1 6.464 4.757l.708.707a1 1 0 0 1 0 1.415ZM18.243 6.879a1 1 0 0 1 0-1.415l.707-.707a1 1 0 0 1 1.415 1.415l-.708.707a1 1 0 0 1-1.414 0ZM4.757 18.243a1 1 0 0 1 0-1.414l.707-.708A1 1 0 1 1 6.88 17.536l-.708.707a1 1 0 0 1-1.414 0Z" fill="currentColor"/>
                </svg>
              </span>
              Theme
            </div>
            <div className={styles.row}>
              <button
                className={`${styles.control} ${theme === "light" ? styles.active : ""}`}
                onClick={() => setTheme("light")}
                aria-pressed={theme === "light"}
                aria-label="Set theme to light mode"
              >Light</button>
              <button
                className={`${styles.control} ${theme === "dark" ? styles.active : ""}`}
                onClick={() => setTheme("dark")}
                aria-pressed={theme === "dark"}
                aria-label="Set theme to dark mode"
              >Dark</button>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <span className={styles.iconPrimary} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-6v12a1 1 0 1 1-2 0V7H5a1 1 0 0 1-1-1Z" fill="currentColor"/>
                </svg>
              </span>
              Text size
            </div>
            <div className={styles.row}>
              <button
                className={`${styles.control} ${textScale === "normal" ? styles.active : ""}`}
                onClick={() => applyTextScale("normal")}
                aria-pressed={textScale === "normal"}
                aria-label="Set text size to normal"
              >A</button>
              <button
                className={`${styles.control} ${textScale === "large" ? styles.active : ""}`}
                onClick={() => applyTextScale("large")}
                aria-pressed={textScale === "large"}
                aria-label="Set text size to large"
              >A+</button>
              <button
                className={`${styles.control} ${textScale === "xlarge" ? styles.active : ""}`}
                onClick={() => applyTextScale("xlarge")}
                aria-pressed={textScale === "xlarge"}
                aria-label="Set text size to extra large"
              >A++</button>
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => applyReducedMotion(e.target.checked)}
              />
              <span className={`${styles.iconPrimary} ${styles.inlineFlex}`} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12c3-6 15-6 18 0" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M6 12c2-4 10-4 12 0" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </span>
              Reduce motion
            </label>
          </div>

          <div className={styles.section}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={floatingReaderEnabled}
                onChange={(e) => applyFloatingReader(e.target.checked)}
              />
              <span className={`${styles.iconPrimary} ${styles.inlineFlex}`} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 8v8a1 1 0 0 0 1.6.8L13 14h3a4 4 0 0 0 0-8h-3l-6.4-2.8A1 1 0 0 0 5 4v4Z" fill="currentColor"/>
                </svg>
              </span>
              Enable floating audio reader
            </label>
          </div>
        </div>
      )}
      {floatingReaderEnabled && (
        <FloatingAudioReader variant="floating" />
      )}
    </div>
  )
}


