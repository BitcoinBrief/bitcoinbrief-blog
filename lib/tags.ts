const DEFAULT_FEATURED_TAG = 'featured'

export function getFeaturedTag(): string {
  return (process.env.NOSTR_FEATURED_TAG || DEFAULT_FEATURED_TAG).toLowerCase()
}

export function isTaggedWith(tags: string[], tag: string): boolean {
  return tags.some((t) => t.toLowerCase() === tag.toLowerCase())
}
