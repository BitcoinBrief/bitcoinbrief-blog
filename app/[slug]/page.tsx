import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/posts'
import { Prose } from '@/components/Prose'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | The Bitcoin Brief`,
    description: post.summary,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const date = new Date(post.publishedAt * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">{date}</p>
      <h1 className="mb-6 font-serif text-4xl font-bold leading-tight">{post.title}</h1>

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.image} alt={post.title} className="mb-10 w-full rounded-md" />
      )}

      <Prose markdown={post.content} />
    </article>
  )
}
