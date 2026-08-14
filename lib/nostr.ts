import { useWebSocketImplementation, SimplePool } from 'nostr-tools/pool'
import { verifyEvent } from 'nostr-tools/pure'
import { nip19 } from 'nostr-tools'
import WebSocket from 'ws'

useWebSocketImplementation(WebSocket as any)

const LONG_FORM_KIND = 30023

const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://relay.primal.net',
]

const DEFAULT_REQUIRED_TAG = 'blog'

export type NostrPost = {
  id: string
  slug: string
  title: string
  summary: string
  image?: string
  publishedAt: number
  content: string
  tags: string[]
}

function getRelays(): string[] {
  const raw = process.env.NOSTR_RELAYS
  if (!raw) return DEFAULT_RELAYS
  return raw
    .split(',')
    .map((r) => r.trim())
    .filter(Boolean)
}

function getRequiredTag(): string {
  return (process.env.NOSTR_BLOG_TAG || DEFAULT_REQUIRED_TAG).toLowerCase()
}

function getPubkeyHex(): string | null {
  const npub = process.env.NOSTR_NPUB
  if (!npub) return null
  try {
    const decoded = nip19.decode(npub)
    if (decoded.type === 'npub') return decoded.data as string
  } catch {
    return null
  }
  return null
}

function tagValue(tags: string[][], name: string): string | undefined {
  return tags.find((t) => t[0] === name)?.[1]
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Fetches NIP-23 long-form posts (kind 30023) for the configured npub from
 * public relays, filtered to those tagged with NOSTR_BLOG_TAG (default
 * "blog"). Events are verified against the claimed pubkey before use, since
 * a rogue relay could otherwise return forged content.
 */
export async function fetchNostrPosts(): Promise<NostrPost[]> {
  const pubkey = getPubkeyHex()
  if (!pubkey) return []

  const relays = getRelays()
  const requiredTag = getRequiredTag()
  const pool = new SimplePool()

  try {
    const events = await pool.querySync(
      relays,
      { kinds: [LONG_FORM_KIND], authors: [pubkey], '#t': [requiredTag] } as any,
      { maxWait: 8000 } as any,
    )

    const verified = events.filter((evt: any) => evt.pubkey === pubkey && verifyEvent(evt))

    const posts = verified
      .map((evt: any): NostrPost => {
        const title = tagValue(evt.tags, 'title') || 'Untitled'
        const summary = tagValue(evt.tags, 'summary') || ''
        const image = tagValue(evt.tags, 'image')
        const dTag = tagValue(evt.tags, 'd')
        const publishedAtTag = tagValue(evt.tags, 'published_at')
        const publishedAt = publishedAtTag ? parseInt(publishedAtTag, 10) : evt.created_at
        const hashtags = evt.tags.filter((t: string[]) => t[0] === 't').map((t: string[]) => t[1])

        return {
          id: evt.id,
          slug: dTag || slugify(title),
          title,
          summary,
          image,
          publishedAt,
          content: evt.content,
          tags: hashtags,
        }
      })
      // Some relays ignore tag filters, so re-check client-side.
      .filter((post) => post.tags.some((t) => t.toLowerCase() === requiredTag))

    // Long-form notes are parameterized-replaceable: keep only the latest
    // revision per slug.
    const bySlug = new Map<string, NostrPost>()
    for (const post of posts) {
      const existing = bySlug.get(post.slug)
      if (!existing || post.publishedAt > existing.publishedAt) {
        bySlug.set(post.slug, post)
      }
    }

    return Array.from(bySlug.values()).sort((a, b) => b.publishedAt - a.publishedAt)
  } finally {
    pool.close(relays)
  }
}
