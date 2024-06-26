import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { getFrameMetadata } from 'frog/next'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {

  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/frames`,
  )
  return {
    title: 'Poke Degen',
    description: 'poke your frens.',
    icons: {
      icon: [
        { url: '/favicon.ico' },
      ],
    },
    keywords: ['poke', 'degen', 'frame', 'frens', 'farcaster', 'warpcast'],
    referrer: 'origin-when-cross-origin',
    other: frameTags,
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
