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
  title: 'WorldClock — by Straw Hat Devs',
  description:
    'A free open-source world clock widget tool. Add digital or analog clocks for any timezone — built by Straw Hat Devs.',
  openGraph: {
    title: 'WorldClock by Straw Hat Devs',
    description: 'Add digital or analog clock widgets for 55+ timezones.',
    type: 'website',
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
