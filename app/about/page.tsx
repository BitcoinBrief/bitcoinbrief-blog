export const metadata = {
  title: 'About | The Bitcoin Brief',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="mb-6 font-serif text-4xl font-bold leading-tight">About</h1>
      <p className="mb-5 text-lg leading-relaxed text-ink/80">
        The Bitcoin Brief is a newsletter published entirely on Nostr. Every post here is a
        long-form Nostr note (NIP-23) — there is no separate CMS behind this page.
      </p>
      <p className="text-lg leading-relaxed text-ink/80">
        Replace this paragraph with your own About content, or publish it from Nostr like
        everything else.
      </p>
    </div>
  )
}
