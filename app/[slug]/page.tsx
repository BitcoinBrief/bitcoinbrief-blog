import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getAllPosts } from '@/lib/posts'

export const revalidate = 3600

export async function generateStaticParams() {
  const { posts } = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { posts } = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | The Bitcoin Brief`,
    description: post.summary,
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { posts } = await getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  const html = marked.parse(post.content) as string
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

      <div
        className="max-w-none font-serif text-lg leading-relaxed text-ink/90 [&_a]:text-accent [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-accent/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-bold [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}
