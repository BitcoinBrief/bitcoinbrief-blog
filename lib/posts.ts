import { cache } from 'react'
import { fetchNostrPosts, type NostrPost } from './nostr'

// Cached so layout.tsx (search index) and each page can both call this
// without triggering duplicate Nostr relay fetches for the same render.
export const getAllPosts = cache(async (): Promise<NostrPost[]> => {
  try {
    return await fetchNostrPosts()
  } catch (error) {
    console.error('Nostr fetch failed:', error)
    return []
  }
})

export type SearchIndexEntry = { slug: string; title: string; summary: string }

export function toSearchIndex(posts: NostrPost[]): SearchIndexEntry[] {
  return posts.map((post) => ({ slug: post.slug, title: post.title, summary: post.summary }))
}
