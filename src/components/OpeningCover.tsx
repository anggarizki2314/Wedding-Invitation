import React, { useState } from 'react'
import { MailOpen, Heart, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { weddingConfig } from '../config/wedding'

interface OpeningCoverProps {
  isOpen: boolean
  onOpen: () => void
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({
  isOpen,
  onOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const { couple, wedding } = weddingConfig

  const handleOpenInvitation = () => {
    setIsAnimating(true)

    // Golden celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#C5A059', '#EAD5A8', '#FAF8F5', '#DFBA73', '#FFFFFF'],
      })
    } catch {
      // Ignore if confetti fails
    }

    setTimeout(() => {
      onOpen()
    }, 600)
  }

  if (isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out ${
        isAnimating
          ? 'opacity-0 -translate-y-full pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(26, 23, 21, 0.75), rgba(26, 23, 21, 0.88)), url(/images/cover.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 max-w-lg w-full mx-4 p-6 sm:p-10 rounded-2xl sm:rounded-3xl glass-card-dark text-center text-white border border-wedding-gold/40 shadow-2xl backdrop-blur-xl">
        {/* Monogram Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full border border-wedding-gold/60 flex items-center justify-center bg-wedding-dark/40 shadow-gold-glow animate-pulse-subtle">
            <Heart className="w-6 h-6 text-wedding-gold fill-wedding-gold/20" />
          </div>
        </div>

        {/* Header Tagline */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-wedding-gold/90 font-medium mb-3">
          The Wedding Of
        </p>

        {/* Groom & Bride Names */}
        <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white mb-2 leading-tight">
          {couple.groom.name}{' '}
          <span className="font-script text-4xl sm:text-6xl text-wedding-gold-light mx-1">&amp;</span>{' '}
          {couple.bride.name}
        </h1>

        {/* Wedding Date */}
        <p className="font-sans text-xs sm:text-sm tracking-widest text-gray-300 uppercase mb-8">
          {wedding.date}
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-wedding-gold" />
          <Sparkles className="w-4 h-4 text-wedding-gold" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-wedding-gold" />
        </div>

        {/* Respectful Universal Greeting */}
        <div className="bg-white/10 border border-white/15 rounded-xl p-4 mb-8 backdrop-blur-md">
          <p className="text-xs text-gray-300 font-light mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className="text-sm sm:text-base font-serif italic text-wedding-gold-light tracking-wide">
            Kami mengundang Anda untuk hadir dalam momen bahagia pernikahan kami
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          onClick={handleOpenInvitation}
          className="gold-shimmer-btn w-full sm:w-auto px-8 py-3.5 rounded-full font-sans text-sm font-semibold tracking-wider uppercase text-wedding-dark shadow-gold-glow flex items-center justify-center gap-2.5 mx-auto hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label="Buka Undangan Pernikahan"
        >
          <MailOpen className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  )
}
