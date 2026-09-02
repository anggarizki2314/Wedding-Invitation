import React from 'react'
import { Clock, Camera, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

export const HealthProtocol: React.FC = () => {
  const { healthProtocol, features } = weddingConfig

  if (!features.healthProtocol || !healthProtocol || !healthProtocol.items || healthProtocol.items.length === 0) {
    return null
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-wedding-gold" />
      case 'Camera':
        return <Camera className="w-5 h-5 text-wedding-gold" />
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-wedding-gold" />
      default:
        return <Sparkles className="w-5 h-5 text-wedding-gold" />
    }
  }

  return (
    <section className="py-20 px-4 bg-wedding-cream/30 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wedding-card border border-wedding-gold/30 shadow-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-wedding-gold" />
            <span className="font-cinzel text-xs tracking-widest text-wedding-dark font-semibold uppercase">
              Etiket &amp; Panduan Acara
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-wedding-dark font-normal">
            Kenyamanan Bersama
          </h2>
          <p className="text-xs sm:text-sm text-wedding-muted mt-2 max-w-md mx-auto">
            Demi kenyamanan dan kelancaran seluruh rangkaian acara pernikahan:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {healthProtocol.items.map((item, index) => (
            <div
              key={index}
              className="glass-card p-5 rounded-2xl border border-wedding-gold/25 shadow-sm flex flex-col items-center text-center hover:border-wedding-gold/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-wedding-cream border border-wedding-sand flex items-center justify-center mb-3">
                {getIcon(item.icon)}
              </div>
              <h4 className="font-serif font-bold text-sm text-wedding-dark mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-wedding-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
