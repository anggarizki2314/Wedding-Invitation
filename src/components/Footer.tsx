import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

export const Footer: React.FC = () => {
  const { groom, bride } = weddingConfig.couple

  return (
    <footer className="pt-20 pb-32 px-4 bg-wedding-dark text-white relative overflow-hidden text-center">
      {/* Background Decorative Rings */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-wedding-gold/10 pointer-events-none -z-0" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border-2 border-wedding-gold/50 flex items-center justify-center mx-auto mb-6 bg-wedding-dark/60 shadow-gold-glow">
          <span className="font-serif text-2xl font-bold text-wedding-gold">
            {groom.name[0]}&amp;{bride.name[0]}
          </span>
        </div>

        {/* Thank You Note */}
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3">
          Terima Kasih
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6 font-light">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kedua mempelai.
        </p>

        {/* Names */}
        <p className="font-script text-4xl sm:text-5xl text-wedding-gold-light mb-8">
          {groom.name} &amp; {bride.name}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-px w-16 bg-wedding-gold/30" />
          <Sparkles className="w-4 h-4 text-wedding-gold" />
          <div className="h-px w-16 bg-wedding-gold/30" />
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-wedding-gold fill-wedding-gold" />
          <span>for {weddingConfig.meta.hashtag}</span>
        </div>
      </div>
    </footer>
  )
}
