import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Nav } from '../components/Nav'

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Note Pad',
  description: 'A simple note taking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} mx-4 md:mx-48 xl:mx-96`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
