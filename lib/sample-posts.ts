import type { NostrPost } from './nostr'

const DAY = 60 * 60 * 24

/**
 * Placeholder content shown until NOSTR_NPUB is configured, so the layout
 * can be previewed before any real Nostr posts are wired up.
 */
export const samplePosts: NostrPost[] = [
  {
    id: 'sample-1',
    slug: 'set-your-npub-to-go-live',
    title: 'Set Your npub to Go Live',
    summary: 'This post is a placeholder. Set NOSTR_NPUB in your Vercel project to pull real posts from Nostr.',
    publishedAt: Math.floor(Date.now() / 1000) - DAY * 1,
    content: `Every article on this page is currently a stand-in.

Once the \`NOSTR_NPUB\` environment variable is set to your public key, the site rebuilds and replaces this content with your real long-form notes (kind \`30023\`) pulled from public Nostr relays.

Nothing else about the layout changes — titles, images, and publish dates all come straight from your Nostr events.`,
    tags: ['setup', 'featured'],
  },
  {
    id: 'sample-2',
    slug: 'how-posts-are-fetched',
    title: 'How Posts Are Fetched From Nostr',
    summary: 'A quick look at where the content on this page comes from.',
    publishedAt: Math.floor(Date.now() / 1000) - DAY * 3,
    content: `Posts are fetched at build time from a set of public relays, filtered to long-form notes (NIP-23, kind \`30023\`) authored by the configured npub.

Each event is checked against its signature before it's used, so a misbehaving relay can't inject content that didn't really come from your key.

The \`d\`, \`title\`, \`summary\`, \`image\`, and \`published_at\` tags map directly onto this page's layout.`,
    tags: ['nostr', 'nip-23', 'featured'],
  },
  {
    id: 'sample-3',
    slug: 'publishing-a-new-post',
    title: 'Publishing a New Post',
    summary: 'Write from any NIP-23 compatible client and this site picks it up on the next rebuild.',
    publishedAt: Math.floor(Date.now() / 1000) - DAY * 7,
    content: `Write and publish a long-form note from any client that supports NIP-23 — for example Habla.news, Yakihonne, or Highlighter.

Trigger a Vercel redeploy (a Deploy Hook works well for this) and the new post appears here automatically, without touching any code.`,
    tags: ['nostr', 'workflow'],
  },
  {
    id: 'sample-4',
    slug: 'no-server-required',
    title: 'No Server Required',
    summary: 'The whole site is static output — Nostr relays are the only backend.',
    publishedAt: Math.floor(Date.now() / 1000) - DAY * 12,
    content: `There's no database and no CMS behind this page. The relays your posts are published to act as the content store, and this site just reads from them at build time.

That keeps hosting free on Vercel's Hobby tier — there's nothing here that needs a paid server.`,
    tags: ['hosting'],
  },
]
