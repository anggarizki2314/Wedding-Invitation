import React from 'react'
import { Heart } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { SafeImage } from './SafeImage'

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export const Couple: React.FC = () => {
  const { groom, bride } = weddingConfig.couple

  return (
    <section id="couple" className="py-24 px-4 bg-wedding-bg relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Groom &amp; Bride
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            Kedua Mempelai
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-lg mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
          </p>
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center relative">
          {/* Groom Card */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="absolute -inset-2 rounded-full border-2 border-wedding-gold/40 -z-10 transition-transform duration-500 group-hover:scale-105" />
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-wedding-card shadow-luxury bg-wedding-sand">
                <SafeImage
                  src={groom.photo}
                  alt={groom.fullName}
                  fallbackText={groom.fullName}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-wedding-dark font-semibold mb-1">
              {groom.fullName}
            </h3>
            <p className="font-script text-2xl sm:text-3xl text-wedding-gold mb-3">
              ({groom.nickname})
            </p>

            <p className="text-xs text-wedding-muted font-medium uppercase tracking-wider mb-1">
              {groom.childOrder || 'Putra dari'}
            </p>
            <p className="text-sm text-wedding-charcoal font-medium mb-4 max-w-xs">
              {groom.parents}
            </p>

            {groom.social && (
              <a
                href={groom.social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wedding-card border border-wedding-sand text-wedding-dark hover:border-wedding-gold hover:text-wedding-gold text-xs font-medium transition-all shadow-sm"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-wedding-gold" />
                <span>{groom.social.username}</span>
              </a>
            )}
          </div>

          {/* Central Heart Connector */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center pointer-events-none z-10">
            <div className="w-12 h-12 rounded-full bg-wedding-card border border-wedding-gold/40 shadow-luxury flex items-center justify-center">
              <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold/30 animate-pulse-subtle" />
            </div>
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="absolute -inset-2 rounded-full border-2 border-wedding-gold/40 -z-10 transition-transform duration-500 group-hover:scale-105" />
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-wedding-card shadow-luxury bg-wedding-sand">
                <SafeImage
                  src={bride.photo}
                  alt={bride.fullName}
                  fallbackText={bride.fullName}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-wedding-dark font-semibold mb-1">
              {bride.fullName}
            </h3>
            <p className="font-script text-2xl sm:text-3xl text-wedding-gold mb-3">
              ({bride.nickname})
            </p>

            <p className="text-xs text-wedding-muted font-medium uppercase tracking-wider mb-1">
              {bride.childOrder || 'Putri dari'}
            </p>
            <p className="text-sm text-wedding-charcoal font-medium mb-4 max-w-xs">
              {bride.parents}
            </p>

            {bride.social && (
              <a
                href={bride.social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-wedding-card border border-wedding-sand text-wedding-dark hover:border-wedding-gold hover:text-wedding-gold text-xs font-medium transition-all shadow-sm"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-wedding-gold" />
                <span>{bride.social.username}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
