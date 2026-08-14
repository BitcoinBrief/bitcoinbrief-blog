import { getAllPosts } from '@/lib/posts'
import { Cover } from '@/components/Cover'
import { FeaturedCarousel } from '@/components/FeaturedCarousel'
import { PostFeed } from '@/components/PostFeed'

export const revalidate = 3600

export default async function HomePage() {
  const { posts, isSample } = await getAllPosts()
  const featured = posts.slice(0, 3)

  return (
    <>
      <Cover />

      {isSample && (
        <div className="mx-auto max-w-6xl px-5 pt-6">
          <p className="rounded-md border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-ink/70">
            Showing sample placeholder posts. Set <code className="font-mono">NOSTR_NPUB</code> in
            this project&rsquo;s Vercel environment variables to pull real posts from Nostr.
          </p>
        </div>
      )}

      <FeaturedCarousel posts={featured} />
      <PostFeed posts={posts} featuredId={featured[0]?.id} />
    </>
  )
}
