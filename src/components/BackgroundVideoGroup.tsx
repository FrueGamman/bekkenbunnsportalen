"use client"

import { useRef } from "react"
import type { PropsWithChildren } from "react"
import styles from "./BackgroundVideoGroup.module.css"

type BackgroundVideoGroupProps = {
  videoSrc?: string
  initialSpacer?: number // viewport heights before content
}

export const BackgroundVideoGroup = ({
  children,
  videoSrc = "https://player.vimeo.com/video/367328676?background=1&autoplay=1&muted=1&loop=1&controls=0",
  initialSpacer = 0,
}: PropsWithChildren<BackgroundVideoGroupProps>) => {
  const groupRef = useRef<HTMLElement | null>(null)

  return (
    <section ref={groupRef} className={styles.wrapper}>
      <div className={styles.background} aria-hidden="true">
        <iframe
          src={videoSrc}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Background Video"
          className={styles.backgroundIframe}
        />
      </div>

      {/* initial spacer so video shows first */}
      <div className={styles.spacer} style={{ height: `${initialSpacer * 100}vh` }} aria-hidden="true" />

      <div className={styles.content}  >{children}</div>
    </section>
  )
}

export default BackgroundVideoGroup

