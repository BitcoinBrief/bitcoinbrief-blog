import { cache } from 'react'
import { fetchNostrPosts, type NostrPost } from './nostr'
import { samplePosts } from './sample-posts'

// Cached so layout.tsx (search index) and each page can both call this
// without triggering duplicate Nostr relay fetches for the same render.
export const getAllPosts = cache(async (): Promise<{ posts: NostrPost[]; isSample: boolean }> => {
  try {
    const posts = await fetchNostrPosts()
    if (posts.length > 0) return { posts, isSample: false }
  } catch (error) {
    console.error('Nostr fetch failed, falling back to sample content:', error)
  }
  return { posts: samplePosts, isSample: true }
})

export type SearchIndexEntry = { slug: string; title: string; summary: string }

export function toSearchIndex(posts: NostrPost[]): SearchIndexEntry[] {
  return posts.map((post) => ({ slug: post.slug, title: post.title, summary: post.summary }))
}
