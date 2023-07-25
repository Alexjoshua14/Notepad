import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Nav } from '../components/Nav'

const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} flex center min-h-screen max-w-screen overflow-x-hidden bg-gradient-to-tr from-teal-400 to-purple-700 text-white`}>
        <Nav />
        <div className="flex-1 flex center max-w-full mx-4 md:mx-48 xl:mx-96 pt-24 pb-12">
          {children}
        </div>
      </body>
    </html>
  )
}
