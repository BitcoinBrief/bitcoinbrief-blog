import Link from 'next/link'
import type { NostrPost } from '@/lib/nostr'
import { LogoMark } from './icons'

export function FeaturedCarousel({ posts }: { posts: NostrPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="mb-6 border-b border-gray-200 pb-3 text-xs font-bold uppercase tracking-widest text-ink/60">
          Featured Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/${post.slug}`} className="group block">
              <div className="mb-3 aspect-[16/10] overflow-hidden rounded-md bg-gray-50">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink/20">
                    <LogoMark size={36} />
                  </div>
                )}
              </div>
              <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-accent">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
