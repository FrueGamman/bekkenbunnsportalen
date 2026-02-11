"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/Button"
import { Card, CardContent } from "./ui/Card"
import styles from "./AudioPlayer.module.css"

interface AudioPlayerProps {
  src: string
  title: string
  transcript?: string
  description?: string
  className?: string
}

export const AudioPlayer = ({ 
  src, 
  title, 
  transcript, 
  description,
  className 
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showTranscript, setShowTranscript] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setError("Kunne ikke laste lydfilen. Vennligst prøv igjen senere.")
      setIsLoading(false)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = parseFloat(e.target.value)
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const audio = audioRef.current
    if (!audio) return

    switch (e.key) {
      case ' ':
        e.preventDefault()
        togglePlayPause()
        break
      case 'ArrowLeft':
        e.preventDefault()
        audio.currentTime = Math.max(0, audio.currentTime - 10)
        break
      case 'ArrowRight':
        e.preventDefault()
        audio.currentTime = Math.min(duration, audio.currentTime + 10)
        break
      case 'ArrowUp':
        e.preventDefault()
        audio.volume = Math.min(1, audio.volume + 0.1)
        setVolume(audio.volume)
        break
      case 'ArrowDown':
        e.preventDefault()
        audio.volume = Math.max(0, audio.volume - 0.1)
        setVolume(audio.volume)
        break
    }
  }

  if (error) {
    return (
      <Card className={`${styles.audioPlayer} ${className || ''}`}>
        <CardContent>
          <div className={styles.errorMessage} role="alert">
            <h3>Lydspiller feil</h3>
            <p>{error}</p>
            {transcript && (
              <div className={styles.transcriptFallback}>
                <h4>Transkripsjon:</h4>
                <p>{transcript}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${styles.audioPlayer} ${className || ''}`}>
      <CardContent>
        <div 
          className={styles.playerContainer}
          role="application"
          aria-label={`Lydspiller for ${title}`}
        >
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            aria-label={title}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <track kind="captions" src="" srcLang="no" label="Norwegian captions" />
          </audio>
          
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>

          {isLoading && (
            <div className={styles.loading} aria-live="polite">
              Laster lydfil...
            </div>
          )}

          <div className={styles.controls}>
            <Button
              onClick={togglePlayPause}
              disabled={isLoading}
              className={styles.playButton}
              aria-label={isPlaying ? "Pause" : "Spill av"}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </Button>

            <div className={styles.timeDisplay}>
              <span aria-live="polite">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className={styles.seekContainer}>
              <label htmlFor="seek" className={styles.seekLabel}>
                Spol til posisjon
              </label>
              <input
                id="seek"
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className={styles.seekSlider}
                disabled={isLoading}
                aria-label="Spol til posisjon i lydfilen"
              />
            </div>

            <div className={styles.volumeContainer}>
              <label htmlFor="volume" className={styles.volumeLabel}>
                Volum
              </label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                aria-label="Juster volum"
              />
              <span className={styles.volumeDisplay}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {transcript && (
            <div className={styles.transcriptSection}>
              <Button
                onClick={() => setShowTranscript(!showTranscript)}
                className={styles.transcriptToggle}
                aria-expanded={showTranscript}
                aria-controls="transcript-content"
              >
                {showTranscript ? "Skjul transkripsjon" : "Vis transkripsjon"}
              </Button>
              
              {showTranscript && (
                <div 
                  id="transcript-content"
                  className={styles.transcriptContent}
                  role="region"
                  aria-label="Transkripsjon av lydinnhold"
                >
                  <h4>Transkripsjon:</h4>
                  <p>{transcript}</p>
                </div>
              )}
            </div>
          )}

          <div className={styles.keyboardHelp}>
            <details>
              <summary>Tastatursnarveier</summary>
              <ul>
                <li><kbd>Mellomrom</kbd> - Spill av/Pause</li>
                <li><kbd>←</kbd> - Spol 10 sekunder tilbake</li>
                <li><kbd>→</kbd> - Spol 10 sekunder frem</li>
                <li><kbd>↑</kbd> - Øk volum</li>
                <li><kbd>↓</kbd> - Senk volum</li>
              </ul>
            </details>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AudioPlayer
