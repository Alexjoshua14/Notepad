
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import { DemoNav } from '@/components/Nav'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Notepad Demo',
  description: 'A simple note taking application',
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DemoNav />
      <div className="flex-1 flex center max-w-full mx-4 md:mx-48 xl:mx-96 pt-24 pb-12">
        {children}
      </div>
    </>
  )
}
