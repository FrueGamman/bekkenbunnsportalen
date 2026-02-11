"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/Button"
import { Card, CardContent } from "../ui/Card"
import { Slider } from "../ui/Slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { useTextToSpeech } from "../../hooks/useTextToSpeech"
import { useLanguage } from "../../context/useLanguage"
import styles from "./AudioReader.module.css"

interface AudioReaderProps {
  text?: string
  className?: string
  variant?: "button" | "panel" | "floating"
  autoRead?: boolean
  showControls?: boolean
}

export const AudioReader: React.FC<AudioReaderProps> = ({
  text,
  className = "",
  variant = "button",
  autoRead = false,
  showControls = true,
}) => {
  const { t, language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)
  const [textToRead, setTextToRead] = useState("")

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
    pitch,
    setPitch,
    volume,
    setVolume,
    progress,
    setLanguage,
  } = useTextToSpeech()

  // Keep TTS language in sync with selected app language
  useEffect(() => {
    const mapped = language === "no" ? "nb-NO" : "en-US"
    setLanguage(mapped)
  }, [language, setLanguage])

  // Extract text from page if not provided
  useEffect(() => {
    if (text) {
      setTextToRead(text)
    } else {
      // Extract readable text from the page
      const extractPageText = () => {
        const elements = document.querySelectorAll(
          'h1, h2, h3, p, li, span, div[class*="text"], div[class*="description"]',
        )
        const textContent = Array.from(elements)
          .map((el) => el.textContent?.trim())
          .filter((text) => text && text.length > 10)
          .join(". ")
        return textContent
      }

      setTextToRead(extractPageText())
    }
  }, [text])

  // Auto-read functionality
  useEffect(() => {
    if (autoRead && textToRead && isSupported) {
      const timer = setTimeout(() => {
        speak(textToRead, { lang: language === "no" ? "nb-NO" : "en-US" })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [autoRead, textToRead, isSupported, speak, language])

  const handlePlayPause = () => {
    // If text hasn't been extracted yet, attempt extraction on demand
    if (!text && !textToRead) {
      const elements = document.querySelectorAll(
        'h1, h2, h3, p, li, span, div[class*="text"], div[class*="description"]',
      )
      const content = Array.from(elements)
        .map((el) => el.textContent?.trim())
        .filter((val) => val && val.length > 10)
        .join(". ")
      if (content) setTextToRead(content)
    }
    if (!text && !textToRead) return

    if (isPlaying) {
      if (isPaused) {
        resume()
      } else {
        pause()
      }
    } else {
      const toSpeak = text || textToRead
      if (toSpeak) {
        speak(toSpeak, { lang: language === "no" ? "nb-NO" : "en-US" })
      }
    }
  }

  const handleStop = () => {
    stop()
  }

  const handleVoiceChange = (voiceName: string) => {
    const voice = voices.find((v) => v.name === voiceName)?.voice
    if (voice) {
      setSelectedVoice(voice)
    }
  }

  if (!isSupported) {
    return (
      <div className={`${styles.unsupported} ${className}`}>
        <span>{t("audio.not_supported") || "Audio not supported"}</span>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <div className={`${styles.audioReaderContainer} ${className}`}>
        <Button
          className={`${styles.listenButton} ${isPlaying ? styles.playing : ""}`}
          onClick={handlePlayPause}
          disabled={!isSupported}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? (t("audio.pause") || "Pause reading") : (t("audio.play") || "Start reading")}
        >
          <div className={styles.listenIcon} aria-hidden="true">
            {isPlaying && !isPaused ? (
              // Pause icon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              // Voice/Play glyph
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10v4a1 1 0 0 0 1 1h3l4 3a1 1 0 0 0 1.6-.8V6.8A1 1 0 0 0 11 6l-4 3H4a1 1 0 0 0-1 1Z"/>
                <path d="M16 8a6 6 0 0 1 0 8" opacity=".5"/>
                <path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" opacity=".3"/>
              </svg>
            )}
          </div>
          <span className={styles.listenText}>
            {isPlaying && !isPaused
              ? t("audio.pause") || "Pause"
              : isPaused
                ? t("audio.resume") || "Resume"
                : t("hero.listen") || "Listen"}
          </span>
          {isPlaying && (
            <div className={styles.progressIndicator}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
          )}
        </Button>

        {showControls && (
          <Button
            className={styles.controlsToggle}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="audio-reader-controls"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </Button>
        )}

        {isExpanded && (
          <Card className={styles.controlsPanel} id="audio-reader-controls" role="region" aria-label={t("audio.controls") || "Audio controls"}>
            <CardContent className={styles.controlsContent}>
              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>{t("audio.voice") || "Voice"}</label>
                <Select value={selectedVoice?.name || ""} onValueChange={handleVoiceChange}>
                  <SelectTrigger className={styles.voiceSelect}>
                    <SelectValue placeholder={t("audio.select_voice") || "Select voice"} />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>
                  {t("audio.speed") || "Speed"}: {rate.toFixed(1)}x
                </label>
                <Slider
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className={styles.slider}
                />
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>
                  {t("audio.pitch") || "Pitch"}: {pitch.toFixed(1)}
                </label>
                <Slider
                  value={[pitch]}
                  onValueChange={(value) => setPitch(value[0])}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className={styles.slider}
                />
              </div>

              <div className={styles.controlGroup}>
                <label className={styles.controlLabel}>
                  {t("audio.volume") || "Volume"}: {Math.round(volume * 100)}%
                </label>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  min={0}
                  max={1}
                  step={0.1}
                  className={styles.slider}
                />
              </div>

              <div className={styles.playbackControls}>
                <Button onClick={handlePlayPause} className={styles.playButton} disabled={!textToRead}>
                  {isPlaying && !isPaused ? t("audio.pause") || "Pause" : t("audio.play") || "Play"}
                </Button>
                <Button onClick={handleStop} className={styles.stopButton} disabled={!isPlaying}>
                  {t("audio.stop") || "Stop"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (variant === "floating") {
    return (
      <div className={`${styles.floatingReader} ${className} ${isPlaying ? styles.active : ""}`}>
        <Button className={styles.floatingButton} onClick={handlePlayPause} disabled={!isSupported}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isPlaying && !isPaused ? (
              <>
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </>
            ) : (
              <polygon points="5,3 19,12 5,21"></polygon>
            )}
          </svg>
        </Button>

        {isPlaying && (
          <div className={styles.floatingProgress}>
            <div className={styles.floatingProgressBar} style={{ width: `${progress}%` }} />
          </div>
        )}

        <Button className={styles.floatingStop} onClick={handleStop} disabled={!isPlaying}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </Button>
      </div>
    )
  }

  return null
}
