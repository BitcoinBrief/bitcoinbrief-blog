import Link from 'next/link'
import type { NostrPost } from '@/lib/nostr'
import { StarIcon, ChevronIcon } from './icons'

function monthAbbrev(ts: number) {
  return new Date(ts * 1000).toLocaleString('en-US', { month: 'short' })
}

function dayNum(ts: number) {
  return new Date(ts * 1000).toLocaleString('en-US', { day: '2-digit' })
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function PostFeed({ posts, featuredId }: { posts: NostrPost[]; featuredId?: string }) {
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 text-center text-ink/50">
        No posts yet.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <ul className="divide-y divide-gray-100">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.slug}`} className="group flex items-center gap-5 py-5">
              <div className="flex h-14 w-14 flex-none flex-col items-center justify-center rounded-md border border-gray-200 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wide text-accent">
                  {monthAbbrev(post.publishedAt)}
                </span>
                <span className="font-serif text-lg font-bold leading-none">
                  {dayNum(post.publishedAt)}
                </span>
              </div>

              <h2 className="flex-1 font-serif text-xl font-bold leading-snug group-hover:text-accent">
                {post.title}
              </h2>

              <div className="flex flex-none items-center gap-3 text-ink/40">
                {post.id === featuredId && <StarIcon />}
                <span className="hidden text-xs sm:inline">{readingTime(post.content)} min read</span>
                <ChevronIcon className="transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
