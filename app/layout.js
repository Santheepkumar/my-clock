import './globals.css'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  // ── Core ─────────────────────────────────────────────────────────────
  title: 'WorldClock — by Straw Hat Devs',
  description:
    'Track time across the globe — digital or analog, your way. A free open-source world clock widget tool.',

  // ── PWA manifest + theme ─────────────────────────────────────────────
  manifest: '/manifest.json',
  themeColor: '#19D7C1',

  // ── Viewport ──────────────────────────────────────────────────────────
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // ── Apple PWA ─────────────────────────────────────────────────────────
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WorldClock',
  },

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '1024x1024', type: 'image/png' },
    ],
    shortcut: '/icons/icon-192.png',
  },

  // ── Open Graph ────────────────────────────────────────────────────────
  openGraph: {
    title: 'WorldClock by Straw Hat Devs',
    description: 'Add digital or analog clock widgets for 80+ timezones. Free & open source.',
    type: 'website',
    images: [{ url: '/icons/icon-512.png' }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
