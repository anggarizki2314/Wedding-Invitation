import React from 'react'
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react'
import { weddingConfig } from '../config/wedding'
import { generateGoogleCalendarUrl } from '../utils/calendar'

export const Event: React.FC = () => {
  const { akad, reception } = weddingConfig.wedding
  const events = [akad, reception]

  return (
    <section id="event" className="py-24 px-4 bg-wedding-bg relative">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Save The Date
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            Rangkaian Acara
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-lg mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {events.map((evt, index) => {
            const calendarUrl = generateGoogleCalendarUrl(evt)

            return (
              <div
                key={index}
                className="glass-card p-6 sm:p-10 rounded-3xl border border-wedding-gold/40 shadow-luxury flex flex-col justify-between text-center relative group glass-card-hover"
              >
                {/* Top Corner Ornaments */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-wedding-gold/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-wedding-gold/40" />

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-wedding-dark font-bold mb-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-serif italic text-wedding-gold font-medium mb-6">
                    {evt.subtitle}
                  </p>

                  <div className="w-16 h-0.5 bg-wedding-gold/40 mx-auto mb-6" />

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center gap-2.5 text-wedding-charcoal">
                      <Calendar className="w-4 h-4 text-wedding-gold flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">
                        {evt.dayName}, {evt.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 text-wedding-charcoal">
                      <Clock className="w-4 h-4 text-wedding-gold flex-shrink-0" />
                      <span className="text-sm font-medium">
                        Pukul {evt.time} {evt.timezone}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-wedding-cream/40 border border-wedding-sand/60 mb-6">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 text-wedding-dark font-semibold text-sm sm:text-base">
                      <MapPin className="w-4 h-4 text-wedding-gold flex-shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                    <p className="text-xs text-wedding-muted leading-relaxed max-w-sm mx-auto">
                      {evt.address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={evt.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-shimmer-btn w-full sm:w-auto px-6 py-2.5 rounded-full text-wedding-dark text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Petunjuk Lokasi (Maps)</span>
                  </a>

                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-wedding-card hover:bg-wedding-cream border border-wedding-gold/60 text-wedding-dark text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-wedding-gold" />
                    <span>Kalender</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
