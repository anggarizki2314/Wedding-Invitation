import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 left-4 sm:bottom-8 sm:left-8 z-40 p-3 rounded-full bg-wedding-card/90 border border-wedding-gold/50 text-wedding-dark shadow-luxury hover:bg-wedding-cream hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md cursor-pointer group"
      aria-label="Kembali ke atas"
      title="Kembali ke atas"
    >
      <ArrowUp className="w-4 h-4 text-wedding-gold transition-transform group-hover:-translate-y-0.5" />
    </button>
  )
}
