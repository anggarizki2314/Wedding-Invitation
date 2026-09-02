import React from 'react'
import { Calendar, Heart, MapPin } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { generateGoogleCalendarUrl } from '../utils/calendar'
import { SafeImage } from './SafeImage'

export const Hero: React.FC = () => {
  const { couple, wedding, meta } = weddingConfig
  const calendarUrl = generateGoogleCalendarUrl(wedding.akad)

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden bg-gradient-to-b from-wedding-cream/60 via-wedding-bg to-wedding-cream/40"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full border border-wedding-gold/20 -z-0 pointer-events-none" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full border border-wedding-sand/40 -z-0 pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center mx-auto flex flex-col items-center">
        {/* Top Monogram Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wedding-card/80 border border-wedding-gold/30 shadow-sm mb-6 backdrop-blur-sm">
          <Heart className="w-3.5 h-3.5 text-wedding-gold fill-wedding-gold" />
          <span className="font-cinzel text-xs tracking-[0.25em] text-wedding-gold font-semibold uppercase">
            Wedding Announcement
          </span>
          <Heart className="w-3.5 h-3.5 text-wedding-gold fill-wedding-gold" />
        </div>

        {/* Main Title Heading */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-muted uppercase mb-3">
          The Wedding Of
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-wedding-dark mb-4 tracking-tight leading-none">
          {couple.groom.name}
          <span className="block font-script text-5xl sm:text-7xl md:text-8xl text-wedding-gold my-2 font-normal">
            &amp;
          </span>
          {couple.bride.name}
        </h1>

        {/* Arch Portrait Frame */}
        <div className="relative my-8 group">
          <div className="absolute -inset-2.5 rounded-t-[140px] sm:rounded-t-[200px] rounded-b-2xl border-2 border-wedding-gold/40 -z-10 transition-transform duration-500 group-hover:scale-[1.02]" />
          
          <div className="relative w-64 sm:w-80 h-80 sm:h-96 rounded-t-[130px] sm:rounded-t-[190px] rounded-b-xl overflow-hidden shadow-2xl border-4 border-wedding-card bg-wedding-sand">
            <SafeImage
              src="/images/cover.jpg"
              alt={`${couple.groom.name} & ${couple.bride.name} Wedding Portrait`}
              loading="eager"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-wedding-card/95 border border-wedding-gold/50 px-5 py-1.5 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-wedding-gold" />
            <span className="text-xs font-medium text-wedding-dark">
              {wedding.akad.venue.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Wedding Date */}
        <p className="font-serif text-lg sm:text-2xl text-wedding-dark tracking-wide font-medium mt-6 mb-2">
          {wedding.date}
        </p>
        <p className="text-xs sm:text-sm text-wedding-muted tracking-widest uppercase mb-8">
          {meta.hashtag}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-wedding-card hover:bg-wedding-cream border border-wedding-gold text-wedding-dark text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-wedding-gold" />
            <span>Simpan ke Kalender</span>
          </a>

          <a
            href="#event"
            className="px-6 py-2.5 rounded-full bg-wedding-dark text-white hover:bg-wedding-charcoal text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-md transition-all duration-300 cursor-pointer"
          >
            <span>Lihat Acara</span>
          </a>
        </div>
      </div>
    </section>
  )
}
