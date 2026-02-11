"use client"

import { useTheme } from "../../../context/ThemeContext"
import styles from "./section-content.module.css"
import { VideoPlayer } from "../../../components/ui/VideoPlayer"

interface IntroductionContent {
  title: string
  subtitle?: string
  description: string | Array<string | { text: string; link?: { text: string; url: string } }>
  image?: {
    src: string
    alt: string
    caption: string
  }
  video?: {
    url?: string
    videoId?: string
    title?: string
    description?: string
  }
}

interface PelvicPainIntroductionProps {
  content?: IntroductionContent
}

export const PelvicPainIntroduction = ({ content }: PelvicPainIntroductionProps) => {
  const { resolvedTheme } = useTheme()

  if (!content) return null

  // Helper to extract video info if not explicitly provided
  const extractVideo = () => {
    if (content.video) return content.video

    if (Array.isArray(content.description)) {
      const ytLink = content.description.find(
        item => typeof item === 'object' && item.link?.url.includes('youtube.com')
      )
      if (typeof ytLink === 'object' && ytLink?.link) {
        return { url: ytLink.link.url, title: ytLink.link.text }
      }
    }
    return null
  }

  const videoData = extractVideo()

  return (
    <div className={`${styles.introductionHero} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.heroGlassContainer}>
        {/* Cinematic Header */}
        <header className={styles.heroHeader}>
          {content.title && <h2 className={styles.heroTitle}>{content.title}</h2>}
          {content.subtitle && <p className={styles.heroSubtitle}>{content.subtitle}</p>}
        </header>

        <div className={styles.heroBody}>
          {/* Visual Media - Cinematic & Integrated Stack */}
          <div className={styles.heroMediaStack}>
            {content.image && (
              <div className={styles.heroImageContainer}>
                <div className={styles.heroImageWrapper}>
                  <img src={content.image.src} alt={content.image.alt} className={styles.heroImage} />
                </div>
                {content.image.caption && <span className={styles.heroImageCaption}>{content.image.caption}</span>}
              </div>
            )}

            {videoData && (
              <div className={styles.heroVideoWrapper}>
                <VideoPlayer
                  videoUrl={videoData.url}
                  videoId={videoData.videoId}
                  title={videoData.title || "Video"}
                  description={videoData.description}
                />
              </div>
            )}
          </div>

          {/* Text Content - premium readability */}
          <div className={styles.heroTextContent}>
            <div className={styles.heroDescription}>
              {typeof content.description === 'string' ? (
                <p>{content.description}</p>
              ) : (
                content.description.map((item, index) => (
                  <p key={index}>
                    {typeof item === 'string' ? item : (
                      <>
                        {item.text}
                        {item.link && (
                          <a href={item.link.url} target="_blank" rel="noopener" className={styles.premiumLink}>
                            {item.link.text}
                          </a>
                        )}
                      </>
                    )}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
