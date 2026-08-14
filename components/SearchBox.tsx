'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { SearchIndexEntry } from '@/lib/posts'
import { SearchIcon } from './icons'

const MAX_RESULTS = 8

export function SearchBox({ index }: { index: SearchIndexEntry[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return index
      .filter((post) => post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q))
      .slice(0, MAX_RESULTS)
  }, [index, query])

  function close() {
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-label="Search this site"
        className="text-ink/70 hover:text-ink"
        onClick={() => setOpen((prev) => !prev)}
      >
        <SearchIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-3 w-80 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent"
          />

          {query.trim() && (
            <ul className="mt-2 max-h-80 overflow-y-auto">
              {results.length === 0 ? (
                <li className="px-2 py-3 text-sm text-ink/50">No matching posts.</li>
              ) : (
                results.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/${post.slug}`}
                      onClick={close}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-gray-50"
                    >
                      <span className="font-serif font-bold">{post.title}</span>
                      {post.summary && (
                        <span className="mt-0.5 block truncate text-xs text-ink/50">{post.summary}</span>
                      )}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
