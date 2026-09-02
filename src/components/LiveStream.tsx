import React from 'react'
import { Video, ExternalLink } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

export const LiveStream: React.FC = () => {
  const { liveStream, features } = weddingConfig

  if (!features.liveStream || !liveStream || !liveStream.url) return null

  return (
    <section className="py-16 px-4 bg-wedding-bg relative">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-wedding-gold/40 shadow-luxury">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-3 text-red-600">
            <Video className="w-6 h-6 animate-pulse" />
          </div>

          <p className="font-cinzel text-xs tracking-widest text-wedding-gold font-bold uppercase mb-1">
            Siaran Langsung
          </p>
          <h3 className="font-serif text-2xl font-bold text-wedding-dark mb-2">
            Live Streaming Pernikahan
          </h3>
          <p className="text-xs sm:text-sm text-wedding-muted mb-4">
            Bagi keluarga dan kerabat yang berhalangan hadir secara langsung, Anda dapat menyaksikan prosesi akad nikah melalui siaran langsung {liveStream.platform}:
          </p>

          <p className="text-xs font-semibold text-wedding-charcoal mb-6">
            Jadwal: {liveStream.time}
          </p>

          <a
            href={liveStream.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-wedding-dark text-xs sm:text-sm font-semibold tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>Tonton di {liveStream.platform}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
