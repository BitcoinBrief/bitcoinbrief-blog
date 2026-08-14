# The Bitcoin Brief — blog

A Next.js blog styled to match bitcoinbrief.io's newsletter layout (Lora/Mulish
type, `#f6911d` accent, calendar-date post list), backed by Nostr instead of a
CMS.

## How content works

Posts are long-form Nostr notes — [NIP-23](https://github.com/nostr-protocol/nips/blob/master/23.md),
kind `30023`. At build time, [`lib/nostr.ts`](lib/nostr.ts) queries a set of
public relays for every kind-`30023` event authored by `NOSTR_NPUB`, verifies
each event's signature, and maps its tags onto the page:

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

## Going live with your npub

1. In the Vercel project settings, add an environment variable:
   - `NOSTR_NPUB` = your `npub1...` string
2. Redeploy (or trigger a Deploy Hook after publishing a new post — new posts
   won't appear until the site rebuilds, since content is fetched at build
   time, not in the browser).

Optionally set `NOSTR_RELAYS` (comma-separated relay URLs) to override the
default relay set in `lib/nostr.ts`.

## Local development

Requires Node.js 18+.

```bash
npm install
cp .env.example .env.local   # then fill in NOSTR_NPUB
npm run dev
```
