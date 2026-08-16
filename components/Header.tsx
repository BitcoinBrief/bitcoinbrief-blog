import Link from 'next/link'
import type { SearchIndexEntry } from '@/lib/posts'
import { SearchBox } from './SearchBox'
import { MobileNav } from './MobileNav'

const LOGO_URL = 'https://i.nostr.build/k3ieTQ2iG9sRpe6fdkXpB5.png'

export function Header({ searchIndex }: { searchIndex: SearchIndexEntry[] }) {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5">
        <Link href="/" className="flex items-center justify-self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="The Bitcoin Brief" className="h-9 w-auto" />
        </Link>

        <nav className="hidden justify-self-center gap-8 text-sm font-semibold md:flex">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-4">
          <SearchBox index={searchIndex} />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
