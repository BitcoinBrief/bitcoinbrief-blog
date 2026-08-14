# The Bitcoin Brief — blog

A Next.js blog styled to match bitcoinbrief.io's newsletter layout (Lora/Mulish
type, `#f6911d` accent, calendar-date post list), backed by Nostr instead of a
CMS.

## How content works

Posts are long-form Nostr notes — [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md),
kind `30023`. At build time, [`lib/nostr.ts`](lib/nostr.ts) queries a set of
public relays for every kind-`30023` event authored by `NOSTR_NPUB` **and
tagged with `#blog`** (configurable via `NOSTR_BLOG_TAG`), verifies each
event's signature, and maps its tags onto the page. That means you can write
long-form notes for other purposes under the same npub — only the ones you
hashtag `#blog` when publishing show up here.

| Nostr tag       | Used for              |
| --------------- | ---------------------- |
| `title`         | Post title              |
| `summary`       | Card/meta description   |
| `image`         | Cover image              |
| `d`             | URL slug (`/your-slug`) |
| `published_at`  | Date shown + sort order  |
| content (body)  | Post body (Markdown)      |

Until `NOSTR_NPUB` is set, the site falls back to placeholder posts (see
[`lib/sample-posts.ts`](lib/sample-posts.ts)) so the layout is visible without
any live content.

Within that `#blog`-tagged set, posts additionally hashtagged `#featured`
(configurable via `NOSTR_FEATURED_TAG`) appear in the featured carousel at
the top of the homepage, and get a star next to them in the main list. Tag
as many or as few posts `#featured` as you want — the carousel just hides
itself if none are tagged.

## Going live with your npub

1. In the Vercel project settings, add an environment variable:
   - `NOSTR_NPUB` = your `npub1...` string
2. Redeploy (or trigger a Deploy Hook after publishing a new post — new posts
   won't appear until the site rebuilds, since content is fetched at build
   time, not in the browser).

Optionally set `NOSTR_RELAYS` (comma-separated relay URLs) to override the
default relay set, `NOSTR_BLOG_TAG` to require a different hashtag than
`blog`, or `NOSTR_FEATURED_TAG` to use something other than `featured` for
the carousel.

## Local development

Requires Node.js 18+.

```bash
npm install
cp .env.example .env.local   # then fill in NOSTR_NPUB
npm run dev
```
