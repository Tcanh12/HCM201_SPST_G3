/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D91C1C',
          light: '#E10600',
        },
        secondary: {
          DEFAULT: '#F5C542',
          light: '#FFD700',
        },
        dark: {
          DEFAULT: '#0B0F1A', // Keep dark neutral for good contrast
          lighter: '#1E293B',
        },
        card: '#1E293B',
        accent: '#0284C7', // Xanh nhẹ cân bằng
        danger: '#DC2626',
        success: '#10B981',
        warning: '#F5C542',
        cyan: '#06B6D4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(225, 6, 0, 0.4), 0 0 60px rgba(225, 6, 0, 0.15)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.4), 0 0 60px rgba(16,185,129,0.15)',
        'glow-amber': '0 0 20px rgba(245, 197, 66, 0.4), 0 0 60px rgba(245, 197, 66, 0.15)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15)',
        'glow-danger': '0 0 20px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(225, 6, 0, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(225, 6, 0, 0.6), 0 0 50px rgba(225, 6, 0, 0.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }
    },
  },
  plugins: [],
}
