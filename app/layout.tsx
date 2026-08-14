import type { Metadata } from 'next'
import { Lora, Mulish } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  weight: ['500', '600', '700'],
})

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'The Bitcoin Brief',
  description: 'A Bitcoin newsletter, published on Nostr.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${mulish.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
