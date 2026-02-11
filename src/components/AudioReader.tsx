"use client"
import { useState, useEffect } from "react"
import { useTextToSpeech } from "../hooks/useTextToSpeech"
import { useLanguage } from "../context/useLanguage"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import styles from "./AudioReader.module.css"

interface AudioReaderProps {
  text: string
  title?: string
  className?: string
  autoPlay?: boolean
}

export const AudioReader = ({ 
  text, 
  title, 
  className,
  autoPlay = false 
}: AudioReaderProps) => {
  const { language } = useLanguage()
  const {
    speak,
    stop,
    pause,
    resume,
    isSupported,
    isPlaying,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    volume,
    setVolume,
    currentText,
    progress,
    setLanguage,
    getVoicesForLanguage
  } = useTextToSpeech()

  const [isExpanded, setIsExpanded] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  // Update TTS language when app language changes (map to BCP-47)
  useEffect(() => {
    const mapped = language === 'no' ? 'nb-NO' : 'en-US'
    setLanguage(mapped)
  }, [language, setLanguage])

  // Auto-play if enabled
  useEffect(() => {
    if (autoPlay && text && !hasStarted) {
      setHasStarted(true)
      speak(text, { lang: language === 'no' ? 'nb-NO' : 'en-US' })
    }
  }, [autoPlay, text, hasStarted, speak, language])

  const handlePlayPause = () => {
    if (isPlaying) {
      if (isPaused) {
        resume()
      } else {
        pause()
      }
    } else {
      speak(text, { lang: language === 'no' ? 'nb-NO' : 'en-US' })
    }
  }

  const handleStop = () => {
    stop()
    setHasStarted(false)
  }

  const currentVoices = getVoicesForLanguage(language === 'no' ? 'nb' : 'en')

  if (!isSupported) {
    return (
      <div className={`${styles.audioReader} ${className || ''}`}>
        <Card>
          <CardContent>
            <div className={styles.notSupported}>
              <p>Lydopplesning er ikke støttet i din nettleser.</p>
              <p>Tekstinnhold:</p>
              <div className={styles.fallbackText}>
                {title && <h3>{title}</h3>}
                <p>{text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`${styles.audioReader} ${className || ''}`}>
      <Card>
        <CardContent>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h3 className={styles.title}>
                {title || 'Lydopplesning'}
              </h3>
              <span className={styles.languageIndicator}>
                {language === 'no' ? '🇳🇴 Norsk' : '🇬🇧 English'}
              </span>
            </div>
            
            <div className={styles.controls}>
              <Button
                onClick={handlePlayPause}
                className={styles.playButton}
                aria-label={isPlaying ? (isPaused ? 'Fortsett opplesning' : 'Pause opplesning') : 'Start opplesning'}
              >
                {isPlaying ? (isPaused ? '▶️' : '⏸️') : '🔊'}
              </Button>
              
              <Button
                onClick={handleStop}
                className={styles.stopButton}
                aria-label="Stopp opplesning"
                disabled={!isPlaying && !isPaused}
              >
                ⏹️
              </Button>
              
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.settingsButton}
                aria-label={isExpanded ? 'Skjul innstillinger' : 'Vis innstillinger'}
                aria-expanded={isExpanded}
              >
                ⚙️
              </Button>
            </div>
          </div>

          {isPlaying && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className={styles.progressText}>
                {Math.round(progress)}% lest
              </span>
            </div>
          )}

          {isExpanded && (
            <div className={styles.settings}>
              <div className={styles.settingGroup}>
                <label htmlFor="voice-select" className={styles.settingLabel}>
                  Stemme:
                </label>
                <select
                  id="voice-select"
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value)
                    if (voice) setSelectedVoice(voice.voice)
                  }}
                  className={styles.voiceSelect}
                >
                  {currentVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.settingGroup}>
                <label htmlFor="rate-slider" className={styles.settingLabel}>
                  Hastighet: {rate.toFixed(1)}x
                </label>
                <input
                  id="rate-slider"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className={styles.slider}
                />
              </div>

              <div className={styles.settingGroup}>
                <label htmlFor="volume-slider" className={styles.settingLabel}>
                  Volum: {Math.round(volume * 100)}%
                </label>
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className={styles.slider}
                />
              </div>
            </div>
          )}

          {currentText && (
            <div className={styles.currentText}>
              <p className={styles.currentTextLabel}>Leser nå:</p>
              <p className={styles.currentTextContent}>{currentText}</p>
            </div>
          )}

          <div className={styles.textContent}>
            {title && <h4>{title}</h4>}
            <p>{text}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AudioReader
