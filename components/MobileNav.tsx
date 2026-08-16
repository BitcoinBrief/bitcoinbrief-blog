'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MenuIcon, CloseIcon } from './icons'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative md:hidden">
      <button
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="text-ink/70 hover:text-ink"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <nav className="absolute right-0 top-full z-20 mt-3 w-44 rounded-lg border border-gray-200 bg-white p-2 text-sm font-semibold shadow-lg">
          <Link href="/" onClick={close} className="block rounded-md px-3 py-2 hover:bg-gray-50">
            Home
          </Link>
          <Link href="/about" onClick={close} className="block rounded-md px-3 py-2 hover:bg-gray-50">
            About
          </Link>
        </nav>
      )}
    </div>
  )
}
