import React from 'react'
import { Home, Users, Calendar, BookOpen, Image, Send, Gift } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

interface NavigationProps {
  activeSection: string
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const { features } = weddingConfig

  const allNavItems = [
    { id: 'hero', label: 'Home', icon: Home, show: true },
    { id: 'couple', label: 'Mempelai', icon: Users, show: true },
    { id: 'event', label: 'Acara', icon: Calendar, show: true },
    { id: 'story', label: 'Cerita', icon: BookOpen, show: features.loveStory },
    { id: 'gallery', label: 'Galeri', icon: Image, show: features.gallery },
    { id: 'rsvp', label: 'RSVP', icon: Send, show: features.rsvp },
    { id: 'gift', label: 'Kado', icon: Gift, show: features.gift },
  ]

  const visibleNavItems = allNavItems.filter((item) => item.show)

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 py-2 rounded-full glass-card-dark border border-wedding-gold/40 shadow-2xl backdrop-blur-xl transition-all duration-300"
    >
      <ul className="flex items-center gap-1 sm:gap-2">
        {visibleNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:px-3 sm:py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-wedding-gold-light bg-white/15 shadow-sm scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Pindah ke bagian ${item.label}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] hidden sm:block font-medium mt-0.5">
                  {item.label}
                </span>

                {isActive && (
                  <span className="sm:hidden absolute -bottom-0.5 w-1 h-1 rounded-full bg-wedding-gold shadow-gold-glow" />
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
