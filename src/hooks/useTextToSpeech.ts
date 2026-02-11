"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isDefault: boolean;
}

export interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
  lang?: string;
}

export interface UseTextToSpeechReturn {
  speak: (text: string, options?: TextToSpeechOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSupported: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  voices: VoiceOption[];
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  currentText: string;
  progress: number;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  getVoicesForLanguage: (lang: string) => VoiceOption[];
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isSupported] = useState(() => "speechSynthesis" in window);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(0.95);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [currentText, setCurrentText] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("no");

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helpers to choose more natural/human voices
  const normalizeLang = useCallback((lang: string) => {
    if (!lang) return "en-US";
    // Map app language to BCP-47 tags we prefer
    if (lang.startsWith("no")) return "nb-NO";
    if (lang.startsWith("en")) return "en-US";
    return lang;
  }, []);

  const getPreferredVoiceForLanguage = useCallback(
    (voiceOptions: VoiceOption[], lang: string) => {
      const targetLang = normalizeLang(lang);
      const inLang = voiceOptions.filter((v) =>
        v.lang.toLowerCase().startsWith(targetLang.slice(0, 2).toLowerCase())
      );

      const scoreVoice = (v: VoiceOption) => {
        const name = v.name.toLowerCase();
        let score = 0;
        // Prefer exact language region match
        if (v.lang.toLowerCase() === targetLang.toLowerCase()) score += 5;
        // Prefer cloud/neural/natural voices exposed by some browsers
        if (name.includes("google")) score += 4;
        if (
          name.includes("neural") ||
          name.includes("natural") ||
          name.includes("premium")
        )
          score += 3;
        // Prefer female if available (often perceived as more natural in TTS catalogs)
        if (name.includes("female")) score += 2;
        // Language-specific hints
        if (targetLang.startsWith("nb") || targetLang.startsWith("no")) {
          if (
            name.includes("norsk") ||
            name.includes("bokmål") ||
            name.includes("norwegian")
          )
            score += 4;
        }
        if (targetLang.startsWith("en")) {
          if (
            name.includes("uk ") ||
            name.includes("us ") ||
            name.includes("english")
          )
            score += 1;
        }
        // Prefer default voices slightly
        if (v.isDefault) score += 1;
        return score;
      };

      const pool = inLang.length > 0 ? inLang : voiceOptions;
      const sorted = [...pool].sort((a, b) => scoreVoice(b) - scoreVoice(a));
      return (
        sorted[0]?.voice || pool[0]?.voice || voiceOptions[0]?.voice || null
      );
    },
    [normalizeLang]
  );

  // Load available voices
  const loadVoices = useCallback(() => {
    if (!isSupported) return;

    const availableVoices = speechSynthesis.getVoices();
    const voiceOptions: VoiceOption[] = availableVoices.map((voice) => ({
      voice,
      name: voice.name,
      lang: voice.lang,
      isDefault: voice.default,
    }));

    setVoices(voiceOptions);

    // Set default voice based on current language with preference rules
    if (!selectedVoice && voiceOptions.length > 0) {
      const preferred = getPreferredVoiceForLanguage(
        voiceOptions,
        currentLanguage
      );
      if (preferred) setSelectedVoice(preferred);
    }
  }, [
    isSupported,
    selectedVoice,
    currentLanguage,
    getPreferredVoiceForLanguage,
  ]);

  useEffect(() => {
    if (!isSupported) return;

    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [isSupported, loadVoices]);

  // Progress tracking
  const startProgressTracking = useCallback((text: string) => {
    let charIndex = 0;
    const totalChars = text.length;

    progressIntervalRef.current = setInterval(() => {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        charIndex += Math.ceil(totalChars / 100); // Approximate progress
        const progressPercent = Math.min((charIndex / totalChars) * 100, 100);
        setProgress(progressPercent);

        if (progressPercent >= 100) {
          clearInterval(progressIntervalRef.current!);
        }
      }
    }, 100);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setProgress(0);
  }, []);

  const speak = useCallback(
    (text: string, options: TextToSpeechOptions = {}) => {
      if (!isSupported || !text.trim()) return;

      // Stop any current speech
      speechSynthesis.cancel();
      stopProgressTracking();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set options
      utterance.rate = options.rate ?? rate;
      utterance.pitch = options.pitch ?? pitch;
      utterance.volume = options.volume ?? volume;

      // Choose a resilient voice fallback if none is currently selected
      let voiceToUse: SpeechSynthesisVoice | null =
        options.voice ?? selectedVoice;
      if (!voiceToUse) {
        // Try to pick a preferred voice for current language, otherwise first available
        const available = speechSynthesis.getVoices();
        if (available && available.length > 0) {
          const voiceOptions = available.map((v) => ({
            voice: v,
            name: v.name,
            lang: v.lang,
            isDefault: v.default,
          }));
          const preferred = getPreferredVoiceForLanguage(
            voiceOptions,
            currentLanguage
          );
          voiceToUse = preferred ?? available[0] ?? null;
        }
      }
      if (voiceToUse) utterance.voice = voiceToUse;

      // Set language with a safe fallback to current app language
      const langToUse =
        options.lang ?? voiceToUse?.lang ?? normalizeLang(currentLanguage);
      utterance.lang = langToUse;

      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setCurrentText(text);
        startProgressTracking(text);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentText("");
        stopProgressTracking();
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentText("");
        stopProgressTracking();
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onresume = () => {
        setIsPaused(false);
      };

      // In some browsers (Safari/iOS), calling speak immediately after cancel
      // can drop the utterance. Resume and defer speak to next tick.
      try {
        speechSynthesis.resume();
      } catch {
        // ignore
      }

      utteranceRef.current = utterance;
      const speakNow = () => speechSynthesis.speak(utterance);
      // Use a minimal timeout to ensure previous cancel has flushed the queue
      setTimeout(speakNow, 0);
    },
    [
      isSupported,
      rate,
      pitch,
      volume,
      selectedVoice,
      startProgressTracking,
      stopProgressTracking,
      currentLanguage,
      normalizeLang,
      getPreferredVoiceForLanguage,
    ]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;

    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentText("");
    stopProgressTracking();
  }, [isSupported, stopProgressTracking]);

  const pause = useCallback(() => {
    if (!isSupported || !isPlaying) return;

    speechSynthesis.pause();
    setIsPaused(true);
  }, [isSupported, isPlaying]);

  const resume = useCallback(() => {
    if (!isSupported || !isPaused) return;

    speechSynthesis.resume();
    setIsPaused(false);
  }, [isSupported, isPaused]);

  // Language-aware functions
  const setLanguage = useCallback(
    (lang: string) => {
      setCurrentLanguage(lang);
      if (voices.length > 0) {
        const preferred = getPreferredVoiceForLanguage(voices, lang);
        if (preferred) setSelectedVoice(preferred);
      }
    },
    [voices, getPreferredVoiceForLanguage]
  );

  const getVoicesForLanguage = useCallback(
    (lang: string) => {
      return voices.filter((v) => v.lang.startsWith(lang));
    },
    [voices]
  );

  // Update voice when language changes
  useEffect(() => {
    if (voices.length > 0) {
      const pool = voices;
      const isCurrentInPool = !!pool.find((v) => v.voice === selectedVoice);
      if (!isCurrentInPool) {
        const preferred = getPreferredVoiceForLanguage(pool, currentLanguage);
        if (preferred) setSelectedVoice(preferred);
      }
    }
  }, [currentLanguage, voices, selectedVoice, getPreferredVoiceForLanguage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      stopProgressTracking();
    };
  }, [stopProgressTracking]);

  return {
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
    currentText,
    progress,
    currentLanguage,
    setLanguage,
    getVoicesForLanguage,
  };
};
