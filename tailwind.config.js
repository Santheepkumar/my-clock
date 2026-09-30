/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#06131F',
        ocean:    '#0B2236',
        teal: {
          DEFAULT: '#19D7C1',
          dark:    '#00666F',
        },
        gold:  '#F7C648',
        sand:  '#FFF2A8',
        ember: '#8E420E',
        'shd-white': '#F8FDFF',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        code:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'teal-glow':   '0 0 28px 2px rgba(25,215,193,0.22)',
        'teal-glow-sm':'0 0 12px 1px rgba(25,215,193,0.18)',
        'gold-glow':   '0 0 18px 2px rgba(247,198,72,0.18)',
        'card':        '0 4px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'teal-gradient':   'linear-gradient(135deg, #19D7C1 0%, #00666F 100%)',
      },
      borderRadius: {
        'brand-sm': '8px',
        'brand-md': '16px',
        'brand-full': '999px',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeOut: {
          '0%':   { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.93)' },
        },
        pulse: {
          '0%, 100%': { boxShadow: '0 0 18px 2px rgba(25,215,193,0.18)' },
          '50%':       { boxShadow: '0 0 32px 6px rgba(25,215,193,0.32)' },
        },
        modalIn: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sweepHands: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in-up':  'fadeInUp 0.35s ease both',
        'fade-out':    'fadeOut 0.25s ease both',
        'teal-pulse':  'pulse 3s ease-in-out infinite',
        'modal-in':    'modalIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
