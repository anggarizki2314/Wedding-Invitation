import React, { useState, useEffect, useCallback } from 'react'
import { weddingConfig } from './config/wedding'
import { getGuestNameFromUrl } from './utils/helpers'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useScrollSpy } from './hooks/useScrollSpy'
import { RSVPService } from './services/rsvpService'
import { WishItem } from './config/types'

// Components
import { OpeningCover } from './components/OpeningCover'
import { Hero } from './components/Hero'
import { Quote } from './components/Quote'
import { Couple } from './components/Couple'
import { Countdown } from './components/Countdown'
import { Event } from './components/Event'
import { LoveStory } from './components/LoveStory'
import { Gallery } from './components/Gallery'
import { RSVP } from './components/RSVP'
import { Wishes } from './components/Wishes'
import { Gift } from './components/Gift'
import { LiveStream } from './components/LiveStream'
import { HealthProtocol } from './components/HealthProtocol'
import { GuestLinkGenerator } from './components/GuestLinkGenerator'
import { MusicPlayer } from './components/MusicPlayer'
import { Navigation } from './components/Navigation'
import { BackToTop } from './components/BackToTop'
import { Toast, ToastMessage } from './components/Toast'
import { Footer } from './components/Footer'

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState('Tamu Undangan')
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [wishes, setWishes] = useState<WishItem[]>(weddingConfig.presetWishes)
  const [dataSource, setDataSource] = useState<'live' | 'local'>('local')

  // Audio player hook
  const { isPlaying, isMuted, playAudio, togglePlay, toggleMute } =
    useAudioPlayer({
      src: weddingConfig.music?.src || '/music/wedding-song.mp3',
      initialAutoplay: false,
    })

  // Dynamic Scroll spy active section tracker
  const activeSection = useScrollSpy([
    'hero',
    'couple',
    'event',
    'story',
    'gallery',
    'rsvp',
    'gift',
  ])

  // Fetch initial wishes from Provider or Local fallback
  const loadWishes = useCallback(async () => {
    const result = await RSVPService.getWishes()
    setWishes(result.wishes)
    setDataSource(result.source)
  }, [])

  useEffect(() => {
    const name = getGuestNameFromUrl()
    setGuestName(name)
    loadWishes()
  }, [loadWishes])

  // Lock body scroll when opening cover is active
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Toast notification helper
  const showToast = (
    text: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    setToasts((prev) => [...prev, { id, text, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Handle Opening Invitation
  const handleOpenInvitation = () => {
    setIsOpen(true)
    if (weddingConfig.features.music && weddingConfig.music?.autoplayOnOpen) {
      playAudio()
    }
  }

  return (
    <div className="relative min-h-screen bg-wedding-bg text-wedding-dark selection:bg-wedding-gold/20 selection:text-wedding-dark">
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Opening Curtain / Cover */}
      <OpeningCover
        isOpen={isOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Wedding Content Container */}
      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Quote / Holy Verse */}
        <Quote />

        {/* 3. The Couple */}
        <Couple />

        {/* 4. Countdown Timer */}
        <Countdown />

        {/* 5. Wedding Events (Akad & Resepsi) */}
        <Event />

        {/* 6. Love Story / Our Journey */}
        <LoveStory />

        {/* 7. Photo Gallery & Lightbox */}
        <Gallery />

        {/* 8. Live Stream Broadcast */}
        <LiveStream />

        {/* 9. Health & Event Protocols */}
        <HealthProtocol />

        {/* 10. RSVP Confirmation Form */}
        <RSVP
          initialGuestName={guestName}
          onRSVPSubmitted={loadWishes}
          showToast={showToast}
        />

        {/* 11. Best Wishes & Guest Book */}
        <Wishes
          wishes={wishes}
          dataSource={dataSource}
          onRefresh={loadWishes}
        />

        {/* 12. Digital Gift & Wedding Envelope */}
        <Gift showToast={showToast} />

        {/* 13. Footer */}
        <Footer />
      </main>

      {/* Floating Controls (Only shown once opened) */}
      {isOpen && (
        <>
          {/* Floating Music Player (Conditional) */}
          <MusicPlayer
            isPlaying={isPlaying}
            isMuted={isMuted}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
          />

          {/* Floating Guest WhatsApp Link Generator Tool (Conditional) */}
          <GuestLinkGenerator showToast={showToast} />

          {/* Floating Bottom Navigation */}
          <Navigation activeSection={activeSection} />

          {/* Back To Top Button */}
          <BackToTop />
        </>
      )}
    </div>
  )
}

export default App
