import Link from 'next/link'
import { SearchIcon } from './icons'

const LOGO_URL = 'https://i.nostr.build/k3ieTQ2iG9sRpe6fdkXpB5.png'

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="The Bitcoin Brief" className="h-9 w-auto" />
        </Link>

        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search this site" className="text-ink/70 hover:text-ink">
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
