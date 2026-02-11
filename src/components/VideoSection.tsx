"use client"
import React from 'react'
import { VideoPlayer } from './ui/VideoPlayer'
import { getVideosByCondition } from '../data/videos'
import type { VideoData } from '../data/videos'
import styles from './VideoSection.module.css'
import sectionStyles from '../conditions/pregnancy/components/section-content.module.css'
import { SectionAccordion } from './SectionAccordion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

interface VideoSectionProps {
  condition: 'fecal-incontinence' | 'pelvic-pain' | 'pregnancy' | 'urinary-incontinence' | 'urinary-retention' | 'constipation' | 'general'
  title?: string
  showCategories?: boolean
  useAccordions?: boolean
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  condition,
  title,
  showCategories = true,
  useAccordions = false
}) => {
  const { resolvedTheme } = useTheme()
  const { t } = useLanguage()
  const videos = getVideosByCondition(condition)

  // Group videos by category
  const videosByCategory = videos.reduce((acc, video) => {
    if (!acc[video.category]) {
      acc[video.category] = []
    }
    acc[video.category].push(video)
    return acc
  }, {} as Record<string, VideoData[]>)

  const categoryLabels = {
    exercise: t('video.category.exercise'),
    instruction: t('video.category.instruction'),
    education: t('video.category.education'),
    treatment: t('video.category.treatment')
  }

  if (videos.length === 0) {
    return (
      <div className={styles.videoSection}>
        <h3 className={styles.sectionTitle}>{title || t('video.section.title')}</h3>
        <p className={styles.noVideos}>{t('video.no.videos')}</p>
      </div>
    )
  }

  return (
    <div className={styles.videoSection}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}

      {showCategories ? (
        Object.entries(videosByCategory).map(([category, categoryVideos]) => (
          useAccordions ? (
            <SectionAccordion
              key={category}
              title={categoryLabels[category as keyof typeof categoryLabels] || category}
              isDarkMode={resolvedTheme === 'dark'}
              defaultOpen={false}
            >
              <div className={styles.videoGrid}>
                {categoryVideos.map((video) => (
                  <VideoPlayer
                    key={video.id}
                    videoUrl={video.videoUrl}
                    title={video.title}
                    description={video.description}
                  />
                ))}
              </div>
            </SectionAccordion>
          ) : (
            <div key={category} className={styles.categorySection}>
              <h4 className={styles.categoryTitle}>{categoryLabels[category as keyof typeof categoryLabels] || category}</h4>
              <div className={styles.videoGrid}>
                {categoryVideos.map((video) => (
                  <VideoPlayer
                    key={video.id}
                    videoUrl={video.videoUrl}
                    title={video.title}
                    description={video.description}
                  />
                ))}
              </div>
            </div>
          )
        ))
      ) : (
        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <VideoPlayer
              key={video.id}
              videoUrl={video.videoUrl}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}
