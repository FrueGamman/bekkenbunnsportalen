"use client"
import React, { useState } from 'react'
import styles from './VideoPlayer.module.css'

interface VideoPlayerProps {
  videoId?: string
  videoUrl?: string
  title: string
  description?: string
  thumbnail?: string
  width?: string
  height?: string
  hideOverlay?: boolean
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  videoUrl,
  title,
  description,
  thumbnail,
  width = "100%",
  height = "315",
  hideOverlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  // Determine if it's a Vimeo or YouTube video
  const isVimeo = videoUrl?.includes('vimeo.com')
  const isYouTube = videoId || videoUrl?.includes('youtube.com')

  if (isPlaying) {
    let embedUrl = ''

    if (isVimeo && videoUrl) {
      // Extract Vimeo video ID from URL
      const vimeoMatch = videoUrl.match(/vimeo\.com\/video\/(\d+)/)
      if (vimeoMatch) {
        embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1`
      }
    } else if (isYouTube) {
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`
      } else if (videoUrl) {
        // Extract YouTube video ID from URL
        const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
        if (youtubeMatch) {
          embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
        }
      }
    }

    return (
      <div className={styles.videoContainer}>
        <iframe
          width={width}
          height={height}
          src={embedUrl}
          title={title}
          frameBorder="0"
          aria-label={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoFrame}
        />
        {description && (
          <p className={styles.videoDescription}>{description}</p>
        )}
      </div>
    )
  }

  // Generate thumbnail URL
  let thumbnailUrl = thumbnail
  if (!thumbnailUrl) {
    if (isVimeo && videoUrl) {
      const vimeoMatch = videoUrl.match(/vimeo\.com\/video\/(\d+)/)
      if (vimeoMatch) {
        // Vimeo doesn't provide easy thumbnail access, use a default
        thumbnailUrl = 'https://via.placeholder.com/560x315/1e40af/ffffff?text=Play+Video'
      }
    } else if (isYouTube) {
      if (videoId) {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      } else if (videoUrl) {
        const youtubeMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
        if (youtubeMatch) {
          thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`
        }
      }
    }
  }

  return (
    <div className={styles.videoContainer}>
      <div
        className={styles.videoThumbnail}
        onClick={handlePlay}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlay() } }}
        role="button"
        tabIndex={0}
        aria-label={`Play video: ${title}`}
        style={{
          backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : undefined,
          width,
          height
        }}
      >
        <div className={styles.playButton}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)" />
            <polygon points="10,8 16,12 10,16" fill="#0066cc" />
          </svg>
        </div>
        {!hideOverlay && (
          <div className={styles.videoOverlay}>
            <h4 className={styles.videoTitle}>{title}</h4>
            {description && (
              <p className={styles.videoDescription}>{description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 