import Clocks from '@/components/Clocks'

export const metadata = {
  title: 'Your Clock',
  description: 'Little Clock app',
  author: 'Santheepkumar',
  ogTitle: 'Your Clock',
  ogType: 'website',
  ogUrl: 'https://www.santheepkumar.vercel.app',
  ogImage: 'https://santheepkumar.vercel.app/static/images/banner.png',
};

export default function Home() {
  return (
    <Clocks />
  )
}
