"use client"
import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './PatientEducationCards.module.css'

// Structured bilingual data for PatientEducationCards
const PATIENT_EDUCATION_DATA = {
  no: {
    videos: {
      title: "Instruksjonsvideoer",
      pelvicFloorIntro: {
        title: "Introduksjon til bekkenbunnsøvelser",
        description: "Lær grunnleggende teknikker for bekkenbunnstrening"
      },
      analIrrigationIntro: {
        title: "Kort introduksjon - Peristeen analirrigasjon",
        description: "Grunnleggende introduksjon til Peristeen analirrigasjon"
      },
      digestiveSystem: {
        title: "Fordøyelsessystemet - Peristeen analirrigasjon",
        description: "Forståelse av fordøyelsessystemet og tarmfunksjon"
      },
      xrayImages: {
        title: "Røtgenbilder med tykktarm - Peristeen analirrigasjon",
        description: "Visualisering av tykktarm og avføring"
      },
      bowelProblems: {
        title: "Tarmproblem - Peristeen analirrigasjon",
        description: "Avføringslekkasje og kronisk forstoppelse"
      },
      bowelEmptying: {
        title: "Tarmtømming og Peristeen",
        description: "Hvordan Peristeen hjelper med tarmtømming"
      },
      peristeenStepByStep: {
        title: "Hvordan bruke Peristeen steg for steg",
        description: "Detaljert veiledning i bruk av Peristeen"
      },
      navinaClassic: {
        title: "Navina Classic irrigasjonssystem",
        description: "Instruksjon i Navina Classic irrigasjonssystem (Wellspect)"
      },
      peristeenSystem: {
        title: "Peristeen irrigasjonssystem",
        description: "Instruksjon i Peristeen irrigasjonssystem (Coloplast)"
      },
      quforaIrrisedo: {
        title: "Qufora Irrisedo Ballonsystem",
        description: "Instruksjon i Qufora Irrisedo Ballonsystem irrigasjonssystem (KvinTo AS)"
      },
      aquaflush: {
        title: "Aquaflush Irrigasjonssystemer",
        description: "Instruksjon i Aquaflush Irrigasjonssystemer (Global Health Technology)"
      },
      fecalIncontinenceInfo: {
        title: "Avføringslekkasje - informasjon fra Ahus",
        description: "Informasjonsfilm fra Ahus om avføringslekkasje for pasienter og pårørende"
      }
    },
    audio: {
      title: "Lydfiler",
      relaxation: {
        title: "Avspenning",
        description: "Guidet avslapningsøvelse for bekkenbunnen"
      },
      mindfulness: {
        title: "Oppmerksomhetstrening",
        description: "Øvelser for å øke bevisstheten om bekkenbunnen"
      },
      sleep: {
        title: "Søvn",
        description: "Avslapningsteknikker for bedre søvn"
      },
      notSupported: "Nettleseren din støtter ikke audio-elementet."
    },
    brochures: {
      title: "Brosjyrer",
      comingSoon: "PDF-brosjyrer kommer snart",
      description: "Vi jobber med å gjøre PDF-brosjyrer tilgjengelige. Disse vil inneholde detaljerte veiledninger og informasjonsmateriell om bekkenbunnshelse."
    },
    cards: {
      instructionalVideos: {
        title: "Instruksjonsvideoer",
        description: "Se videoer med øvelser og teknikker"
      },
      audioFiles: {
        title: "Lydfiler",
        description: "Hør guidet avslapning og øvelser"
      },
      brochures: {
        title: "Brosjyrer",
        description: "Last ned PDF-brosjyrer og veiledninger"
      },
    }
  },
  en: {
    videos: {
      title: "Instructional videos",
      pelvicFloorIntro: {
        title: "Introduction to pelvic floor exercises",
        description: "Learn basic techniques for pelvic floor training"
      },
      analIrrigationIntro: {
        title: "Brief introduction - Peristeen anal irrigation",
        description: "Basic introduction to Peristeen anal irrigation"
      },
      digestiveSystem: {
        title: "The digestive system - Peristeen anal irrigation",
        description: "Understanding the digestive system and bowel function"
      },
      xrayImages: {
        title: "X-ray images with colon - Peristeen anal irrigation",
        description: "Visualization of colon and stool"
      },
      bowelProblems: {
        title: "Bowel problems - Peristeen anal irrigation",
        description: "Fecal incontinence and chronic constipation"
      },
      bowelEmptying: {
        title: "Bowel emptying and Peristeen",
        description: "How Peristeen helps with bowel emptying"
      },
      peristeenStepByStep: {
        title: "How to use Peristeen step by step",
        description: "Detailed guidance on using Peristeen"
      },
      navinaClassic: {
        title: "Navina Classic irrigation system",
        description: "Instructions for Navina Classic irrigation system (Wellspect)"
      },
      peristeenSystem: {
        title: "Peristeen irrigation system",
        description: "Instructions for Peristeen irrigation system (Coloplast)"
      },
      quforaIrrisedo: {
        title: "Qufora Irrisedo Balloon System",
        description: "Instructions for Qufora Irrisedo Balloon System irrigation system (KvinTo AS)"
      },
      aquaflush: {
        title: "Aquaflush Irrigation Systems",
        description: "Instructions for Aquaflush Irrigation Systems (Global Health Technology)"
      },
      fecalIncontinenceInfo: {
        title: "Fecal incontinence - information from Ahus",
        description: "Information video from Ahus about fecal incontinence for patients and relatives"
      }
    },
    audio: {
      title: "Audio files",
      relaxation: {
        title: "Relaxation",
        description: "Guided relaxation exercise for the pelvic floor"
      },
      mindfulness: {
        title: "Mindfulness training",
        description: "Exercises to increase awareness of the pelvic floor"
      },
      sleep: {
        title: "Sleep",
        description: "Relaxation techniques for better sleep"
      },
      notSupported: "Your browser does not support the audio element."
    },
    brochures: {
      title: "Brochures",
      comingSoon: "PDF brochures coming soon",
      description: "We are working to make PDF brochures available. These will contain detailed guides and information materials about pelvic floor health."
    },
    cards: {
      instructionalVideos: {
        title: "Instructional videos",
        description: "Watch videos with exercises and techniques"
      },
      audioFiles: {
        title: "Audio files",
        description: "Listen to guided relaxation and exercises"
      },
      brochures: {
        title: "Brochures",
        description: "Download PDF brochures and guides"
      },
    }
  }
} as const

interface CardData {
  id: string
  titleKey: string
  descriptionKey: string
  icon: React.ReactNode
}

interface VideoData {
  id: string
  url: string
  title: string
  description?: string
}

interface AudioData {
  id: string
  url: string
  title: string
  description?: string
}

export const PatientEducationCards: React.FC = () => {
  const { language } = useLanguage()
  const [selectedCard, setSelectedCard] = useState<string | null>('instructional-videos')
  
  const data = PATIENT_EDUCATION_DATA[language]

  const handleCardClick = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId)
  }

  // Video data - easy to add more videos later
  const videoData: VideoData[] = [
    {
      id: 'pelvic-floor-intro',
      url: 'https://www.youtube.com/watch?v=E9tVWoRhPKU',
      title: data.videos.pelvicFloorIntro.title,
      description: data.videos.pelvicFloorIntro.description
    },
    {
      id: 'anal-irrigation-intro',
      url: 'https://player.vimeo.com/video/107906921',
      title: data.videos.analIrrigationIntro.title,
      description: data.videos.analIrrigationIntro.description
    },
    {
      id: 'digestive-system',
      url: 'https://player.vimeo.com/video/107906923',
      title: data.videos.digestiveSystem.title,
      description: data.videos.digestiveSystem.description
    },
    {
      id: 'xray-images',
      url: 'https://player.vimeo.com/video/107906925',
      title: data.videos.xrayImages.title,
      description: data.videos.xrayImages.description
    },
    {
      id: 'bowel-problems',
      url: 'https://player.vimeo.com/video/107906927',
      title: data.videos.bowelProblems.title,
      description: data.videos.bowelProblems.description
    },
    {
      id: 'bowel-emptying',
      url: 'https://player.vimeo.com/video/107906985',
      title: data.videos.bowelEmptying.title,
      description: data.videos.bowelEmptying.description
    },
    {
      id: 'peristeen-step-by-step',
      url: 'https://player.vimeo.com/video/107906922',
      title: data.videos.peristeenStepByStep.title,
      description: data.videos.peristeenStepByStep.description
    },
    // {

  ]

  // Audio data
  const audioData: AudioData[] = [
    {
      id: 'relaxation',
      url: 'https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/08/Avspenning.mp3',
      title: data.audio.relaxation.title,
      description: data.audio.relaxation.description
    },
    {
      id: 'mindfulness',
      url: 'https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/08/Oppmerksomhetstrening.mp3',
      title: data.audio.mindfulness.title,
      description: data.audio.mindfulness.description
    },
    {
      id: 'sleep',
      url: 'https://www.bekkenbunnsportalen.no/wp-content/uploads/2022/08/Sovn.mp3',
      title: data.audio.sleep.title,
      description: data.audio.sleep.description
    }
  ]

  const cardData: CardData[] = [
    {
      id: 'instructional-videos',
      titleKey: data.cards.instructionalVideos.title,
      descriptionKey: data.cards.instructionalVideos.description,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="60" height="40" rx="5" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M30 20L50 10L70 20" stroke="currentColor" strokeWidth="3" fill="none"/>
          <polygon points="40,40 60,50 40,60" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'audio-files',
      titleKey: data.cards.audioFiles.title,
      descriptionKey: data.cards.audioFiles.description,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M40 40L50 50L60 40" stroke="currentColor" strokeWidth="3" fill="none"/>
          <circle cx="50" cy="35" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'brochures',
      titleKey: data.cards.brochures.title,
      descriptionKey: data.cards.brochures.description,
      icon: (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="20" width="50" height="60" rx="3" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M35 35H65M35 45H65M35 55H55" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ]

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  // Extract Vimeo video ID from URL
  const getVimeoVideoId = (url: string): string | null => {
    const match = url.match(/(?:vimeo\.com\/video\/|player\.vimeo\.com\/video\/)(\d+)/)
    return match ? match[1] : null
  }

  // Get embed URL for video
  const getVideoEmbedUrl = (url: string): string | null => {
    // Check if it's already a Vimeo player URL
    if (url.includes('player.vimeo.com/video/')) {
      return url
    }
    
    // Check for YouTube
    const youtubeId = getYouTubeVideoId(url)
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`
    }
    
    // Check for Vimeo
    const vimeoId = getVimeoVideoId(url)
    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}`
    }
    
    return null
  }

  // Render video content
  const renderVideoContent = () => (
    <div className={styles.contentSection}>
      <h3 className={styles.contentTitle}>
        {data.videos.title}
      </h3>
      <div className={styles.videoGrid}>
        {videoData.map((video) => {
          const embedUrl = getVideoEmbedUrl(video.url)
          if (!embedUrl) return null
          
          return (
            <div key={video.id} className={styles.videoItem}>
              <div className={styles.videoContainer}>
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className={styles.videoIframe}
                />
              </div>
              <div className={styles.videoInfo}>
                <h4 className={styles.videoTitle}>{video.title}</h4>
                {video.description && (
                  <p className={styles.videoDescription}>{video.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  // Render audio content
  const renderAudioContent = () => (
    <div className={styles.contentSection}>
      <h3 className={styles.contentTitle}>
        {data.audio.title}
      </h3>
      <div className={styles.audioGrid}>
        {audioData.map((audio) => (
          <div key={audio.id} className={styles.audioPlayer}>
            <div className={styles.audioHeader}>
              <button className={styles.playButton}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
              <div className={styles.audioInfo}>
                <h4 className={styles.audioTitle}>{audio.title}</h4>
                {audio.description && (
                  <p className={styles.audioDescription}>{audio.description}</p>
                )}
              </div>
            </div>
            <audio controls className={styles.audioControls} preload="metadata">
              <source src={audio.url} type="audio/mpeg" />
              <track kind="captions" srcLang="no" label="Norsk" />
              {data.audio.notSupported}
            </audio>
          </div>
        ))}
      </div>
    </div>
  )

  // Render brochures content
  const renderBrochuresContent = () => (
    <div className={styles.placeholderSection}>
      <div className={styles.placeholderContent}>
        <div className={styles.placeholderIcon}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <h3 className={styles.placeholderTitle}>
          {data.brochures.title}
        </h3>
        <p className={styles.placeholderSubtitle}>
          {data.brochures.comingSoon}
        </p>
        <p className={styles.placeholderDescription}>
          {data.brochures.description}
        </p>
      </div>
    </div>
  )


  // Render selected content
  const renderSelectedContent = () => {
    switch (selectedCard) {
      case 'instructional-videos':
        return renderVideoContent()
      case 'audio-files':
        return renderAudioContent()
      case 'brochures':
        return renderBrochuresContent()
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${selectedCard === card.id ? styles.cardSelected : ''}`}
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(card.id)
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={selectedCard === card.id}
          >
            <div className={styles.cardIcon}>
              {card.icon}
            </div>
            <h4 className={styles.cardTitle}>{card.titleKey}</h4>
            <p className={styles.cardDescription}>{card.descriptionKey}</p>
          </div>
        ))}
      </div>

      {/* Content Area - Shows below the grid */}
      {selectedCard && (
        <div className={styles.contentArea}>
          {renderSelectedContent()}
        </div>
      )}
    </div>
  )
}

export default PatientEducationCards
