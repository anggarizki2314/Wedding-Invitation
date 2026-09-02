import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { SafeImage } from './SafeImage'

export const Gallery: React.FC = () => {
  const { gallery, features } = weddingConfig
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || !gallery) return
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + gallery.images.length) % gallery.images.length
        : null
    )
  }, [selectedIndex, gallery])

  const handleNext = useCallback(() => {
    if (selectedIndex === null || !gallery) return
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % gallery.images.length : null
    )
  }, [selectedIndex, gallery])

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex, handlePrev, handleNext])

  if (!features.gallery || !gallery || gallery.images.length === 0) return null

  return (
    <section id="gallery" className="py-24 px-4 bg-wedding-bg relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Captured Moments
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            {gallery.title}
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-md mx-auto">
            {gallery.subtitle}
          </p>
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {gallery.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative h-48 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-luxury cursor-pointer border border-wedding-gold/20 bg-wedding-cream/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <SafeImage
                src={img.url}
                alt={img.alt}
                fallbackText={img.caption || img.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="self-end p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
                    {img.caption || img.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery Lightbox Modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
            aria-label="Tutup Galeri"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
            aria-label="Foto Berikutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={gallery.images[selectedIndex].url}
              alt={gallery.images[selectedIndex].alt}
              fallbackText={gallery.images[selectedIndex].caption || gallery.images[selectedIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/20 animate-fade-in"
            />
            {gallery.images[selectedIndex].caption && (
              <p className="text-white/90 text-sm sm:text-base font-serif italic mt-4 text-center px-4">
                &ldquo;{gallery.images[selectedIndex].caption}&rdquo;
              </p>
            )}
            <p className="text-gray-400 text-xs mt-1">
              {selectedIndex + 1} dari {gallery.images.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
