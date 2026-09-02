import React from 'react'
import { Heart, Sparkles } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

export const LoveStory: React.FC = () => {
  const { story, features } = weddingConfig

  if (!features.loveStory || !story || story.length === 0) return null

  return (
    <section id="story" className="py-24 px-4 bg-wedding-cream/30 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-wedding-gold font-bold uppercase mb-2">
            Our Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-dark font-normal">
            Kisah Cinta Kami
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-3 max-w-md mx-auto">
            Setiap kisah cinta itu indah, namun kisah cinta kami adalah yang paling kami syukuri.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-wedding-gold/30 ml-4 sm:ml-32 space-y-12 pb-4">
          {story.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-wedding-card border-2 border-wedding-gold shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                <Heart className="w-3.5 h-3.5 text-wedding-gold fill-wedding-gold/40" />
              </div>

              <div className="sm:absolute sm:-left-32 sm:top-2 text-left sm:text-right w-24 mb-2 sm:mb-0">
                <span className="font-serif text-xl sm:text-2xl font-bold text-wedding-gold">
                  {item.year}
                </span>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-wedding-gold/30 shadow-luxury transition-all duration-300 group-hover:translate-x-1 group-hover:border-wedding-gold">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-wedding-gold" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-wedding-dark">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-wedding-charcoal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
