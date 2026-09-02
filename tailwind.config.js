/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          bg: "#FAF8F5",
          card: "#FFFFFF",
          cream: "#F5EFE6",
          sand: "#EBDDCB",
          dark: "#1A1715",
          charcoal: "#2C2825",
          muted: "#7A726B",
          gold: {
            light: "#EAD5A8",
            DEFAULT: "#C5A059",
            dark: "#9E7B35",
            hover: "#B38F48",
          },
          rose: {
            light: "#F7EBE8",
            DEFAULT: "#E5BDB5",
            dark: "#B88377",
          },
          emerald: {
            light: "#EAF2EE",
            DEFAULT: "#2D5A46",
          }
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "serif"],
        script: ["'Alex Brush'", "'Great Vibes'", "cursive"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(197, 160, 89, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'luxury-hover': '0 20px 40px -10px rgba(197, 160, 89, 0.22), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.35)',
        'soft-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DFBA73 0%, #C5A059 50%, #9E7B35 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, #FBF6EB 0%, #F5EED5 50%, #EAD5A8 100%)',
        'pearl-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A1715 0%, #2C2825 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
