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

  // Helper to extract video info
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

  // Filter out the bare youtube-link object from description text
  const filteredDescription = Array.isArray(content.description)
    ? content.description.filter(
      item => !(typeof item === 'object' && item.link?.url.includes('youtube.com'))
    )
    : content.description

  return (
    <div className={`${styles.introductionHero} ${resolvedTheme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.heroGlassContainer}>
        {/* Header */}
        <header className={styles.heroHeader}>
          {content.title && <h2 className={styles.heroTitle}>{content.title}</h2>}
          {content.subtitle && <p className={styles.heroSubtitle}>{content.subtitle}</p>}
        </header>

        {/* Image — full width on top */}
        {content.image && (
          <div className={styles.heroTopImage}>
            <img
              src={content.image.src}
              alt={content.image.alt}
              className={styles.heroImage}
            />
          </div>
        )}

        {/* Two-column row below image: video left, text right */}
        <div className={styles.heroBody}>
          {/* Left: Video */}
          {videoData && (
            <div className={styles.heroMediaStack}>
              <div className={styles.heroVideoWrapper}>
                <VideoPlayer
                  videoUrl={videoData.url}
                  videoId={videoData.videoId}
                  title={videoData.title || "Video"}
                  description={videoData.description}
                />
              </div>
            </div>
          )}

          {/* Right: Text */}
          <div className={styles.heroTextContent}>
            <div className={styles.heroDescription}>
              {typeof filteredDescription === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: filteredDescription }} />
              ) : (
                filteredDescription.map((item, index) => (
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
