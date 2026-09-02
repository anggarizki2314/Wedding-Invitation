import React from 'react'
import { Quote as QuoteIcon, Sparkles } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

export const Quote: React.FC = () => {
  const { quote, features } = weddingConfig

  if (!features.quote || !quote) return null

  return (
    <section className="py-20 px-4 bg-wedding-cream/30 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-wedding-card border border-wedding-gold/40 flex items-center justify-center shadow-luxury">
            <QuoteIcon className="w-5 h-5 text-wedding-gold rotate-180" />
          </div>
        </div>

        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-wedding-gold/30 shadow-luxury relative">
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-wedding-gold/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-wedding-gold/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-wedding-gold/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-wedding-gold/40" />

          {quote.arabicText && (
            <p className="text-xl sm:text-2xl md:text-3xl text-wedding-dark font-serif font-medium leading-loose mb-6 tracking-wide" style={{ direction: 'rtl' }}>
              {quote.arabicText}
            </p>
          )}

          <p className="font-serif italic text-sm sm:text-base text-wedding-charcoal leading-relaxed mb-6 font-normal">
            &ldquo;{quote.text}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-px w-12 bg-wedding-gold/40" />
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
            <div className="h-px w-12 bg-wedding-gold/40" />
          </div>

          <p className="font-cinzel text-xs tracking-[0.25em] text-wedding-gold font-bold uppercase">
            {quote.source}
          </p>
        </div>
      </div>
    </section>
  )
}
