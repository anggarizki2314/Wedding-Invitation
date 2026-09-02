import React from 'react'
import { Play, Pause, Volume2, VolumeX, Disc3, Music } from 'lucide-react'
import { weddingConfig } from '../config/wedding'

interface MusicPlayerProps {
  isPlaying: boolean
  isMuted: boolean
  onTogglePlay: () => void
  onToggleMute: () => void
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  const { music, features } = weddingConfig

  if (!features.music || !music) return null

  return (
    <aside
      aria-label="Pemutar Musik Latar Belakang"
      className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 group"
    >
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-wedding-dark/85 text-white border border-wedding-gold/30 shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-md">
        <Music className="w-3 h-3 text-wedding-gold animate-bounce" />
        <span className="truncate max-w-[140px] font-medium">
          {music.title}
        </span>
      </div>

      <div className="flex items-center gap-1.5 bg-wedding-card/90 border border-wedding-gold/60 p-1.5 rounded-full shadow-luxury backdrop-blur-md">
        <button
          onClick={onTogglePlay}
          className="relative w-11 h-11 rounded-full bg-wedding-dark text-wedding-gold flex items-center justify-center overflow-hidden shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          <Disc3
            className={`w-7 h-7 text-wedding-gold transition-all duration-300 ${
              isPlaying ? 'animate-spin-slow text-wedding-gold-light' : 'opacity-60'
            }`}
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white fill-white" />
            ) : (
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            )}
          </div>
        </button>

        <button
          onClick={onToggleMute}
          className="p-2 rounded-full hover:bg-wedding-cream text-wedding-charcoal transition-colors cursor-pointer"
          aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-wedding-gold" />
          )}
        </button>

        {isPlaying && !isMuted && (
          <div className="flex items-end gap-0.5 px-2 h-4">
            <div className="w-1 bg-wedding-gold rounded-full equalizer-bar" />
            <div className="w-1 bg-wedding-gold rounded-full equalizer-bar" />
            <div className="w-1 bg-wedding-gold rounded-full equalizer-bar" />
            <div className="w-1 bg-wedding-gold rounded-full equalizer-bar" />
          </div>
        )}
      </div>
    </aside>
  )
}
