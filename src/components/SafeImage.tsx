import React, { useState } from 'react'
import { Heart } from 'lucide-react'

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-wedding-sand/50 text-wedding-gold border border-wedding-gold/30 p-4 text-center ${className}`}
        role="img"
        aria-label={alt || 'Wedding Image'}
      >
        <Heart className="w-8 h-8 text-wedding-gold fill-wedding-gold/20 mb-2 animate-pulse-subtle" />
        <span className="font-serif text-xs sm:text-sm font-medium text-wedding-dark/80">
          {fallbackText || alt || 'The Wedding of Rizki & Amelia'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt || 'Wedding image'}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  )
}
