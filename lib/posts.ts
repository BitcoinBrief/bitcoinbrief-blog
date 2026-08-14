import { fetchNostrPosts, type NostrPost } from './nostr'
import { samplePosts } from './sample-posts'

export async function getAllPosts(): Promise<{ posts: NostrPost[]; isSample: boolean }> {
  try {
    const posts = await fetchNostrPosts()
    if (posts.length > 0) return { posts, isSample: false }
  } catch (error) {
    console.error('Nostr fetch failed, falling back to sample content:', error)
  }
  return { posts: samplePosts, isSample: true }
}
