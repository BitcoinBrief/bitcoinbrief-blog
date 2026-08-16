import Link from 'next/link'
import type { NostrPost } from '@/lib/nostr'
import { getFeaturedTag, isTaggedWith } from '@/lib/tags'
import { LogoMark, StarIcon, ChevronIcon } from './icons'

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function PostFeed({ posts }: { posts: NostrPost[] }) {
  const featuredTag = getFeaturedTag()

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
              <div className="h-14 w-14 flex-none overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink/20">
                    <LogoMark size={24} />
                  </div>
                )}
              </div>

              <h2 className="flex-1 font-serif text-xl font-bold leading-snug group-hover:text-accent">
                {post.title}
              </h2>

              <div className="flex flex-none items-center gap-2 text-xs text-ink/40">
                {isTaggedWith(post.tags, featuredTag) && <StarIcon />}
                <span>{formatDate(post.publishedAt)}</span>
                <span className="hidden sm:inline">· {readingTime(post.content)} min read</span>
                <ChevronIcon className="transition group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
