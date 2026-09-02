import { useState, useEffect, useRef, useCallback } from 'react'

interface UseAudioPlayerProps {
  src: string
  initialAutoplay?: boolean
}

export function useAudioPlayer({ src }: UseAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element instance
    const audio = new Audio(src)
    audio.loop = true
    audio.preload = 'auto'
    audioRef.current = audio

    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const playAudio = useCallback(async () => {
    if (!audioRef.current) return
    try {
      setHasInteracted(true)
      audioRef.current.muted = isMuted
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (err) {
      console.warn('Audio autoplay blocked or failed to load:', err)
      setIsPlaying(false)
    }
  }, [isMuted])

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }, [isPlaying, pauseAudio, playAudio])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    const nextMuted = !isMuted
    audioRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }, [isMuted])

  return {
    isPlaying,
    isMuted,
    hasInteracted,
    playAudio,
    pauseAudio,
    togglePlay,
    toggleMute,
  }
}
