import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Nav } from '../components/Nav'

const roboto = Roboto({ weight: ["100", "300", "400", "700"], subsets: ["latin"], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Notepad',
  description: 'A simple note taking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overscroll-none">
      <body className={`${roboto.variable} min-h-screen bg-gradient-to-tr from-teal-800 to-pink-800 text-white`}>
        <Nav />
        <div className="mx-4 md:mx-48 xl:mx-96 mt-24">
          {children}
        </div>
      </body>
    </html>
  )
}
