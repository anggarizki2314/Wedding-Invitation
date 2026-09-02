import React from 'react'
import { Clock, CalendarHeart } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { useCountdown } from '../hooks/useCountdown'

export const Countdown: React.FC = () => {
  const { wedding, features } = weddingConfig

  if (!features.countdown) return null

  const { days, hours, minutes, seconds, isPassed } = useCountdown(
    wedding.countdownDate
  )

  const timeBlocks = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ]

  return (
    <section className="py-16 px-4 bg-wedding-cream/40 relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wedding-card border border-wedding-gold/40 shadow-sm mb-4">
          <Clock className="w-4 h-4 text-wedding-gold" />
          <span className="font-cinzel text-xs tracking-widest text-wedding-dark font-semibold uppercase">
            Hitung Mundur Hari Bahagia
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl text-wedding-dark font-normal mb-8">
          Menuju Momen Spesial
        </h2>

        {isPassed ? (
          <div className="glass-card p-8 rounded-3xl border border-wedding-gold/40 max-w-lg mx-auto shadow-luxury">
            <CalendarHeart className="w-12 h-12 text-wedding-gold mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-wedding-dark font-semibold mb-2">
              Alhamdulillah
            </h3>
            <p className="text-sm text-wedding-charcoal leading-relaxed">
              Rangkaian acara pernikahan kami telah terlaksana dengan lancar dan penuh berkah. Terima kasih atas seluruh doa dan restu yang telah diberikan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-wedding-gold/30 shadow-luxury flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1"
              >
                <span className="font-serif text-3xl sm:text-5xl font-bold text-wedding-dark tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="font-sans text-xs sm:text-sm text-wedding-muted font-medium uppercase tracking-wider mt-1">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
