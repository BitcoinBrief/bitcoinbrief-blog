import { getAllPosts } from '@/lib/posts'
import { getFeaturedTag, isTaggedWith } from '@/lib/tags'
import { Cover } from '@/components/Cover'
import { FeaturedCarousel } from '@/components/FeaturedCarousel'
import { PostFeed } from '@/components/PostFeed'

export const revalidate = 3600

export default async function HomePage() {
  const posts = await getAllPosts()
  const featuredTag = getFeaturedTag()
  const featured = posts.filter((post) => isTaggedWith(post.tags, featuredTag))

  return (
    <>
      <Cover />
      <FeaturedCarousel posts={featured} />
      <PostFeed posts={posts} />
    </>
  )
}
