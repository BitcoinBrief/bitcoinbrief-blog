const COVER_ICON_URL = 'https://i.nostr.build/j4j7tRBbKLrR7Oz9xInAjc.jpg'

export function Cover() {
  return (
    <div className="border-b border-gray-100">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COVER_ICON_URL} alt="The Bitcoin Brief" className="h-full w-full object-contain p-2" />
        </div>

        <p className="max-w-xl text-lg text-ink/80">
          Welcome to The Bitcoin Brief, a Bitcoin newsletter published on Nostr.
        </p>

        <div className="flex gap-3">
          <a
            href="#"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Subscribe now
          </a>
          <a
            href="#"
            className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-ink transition hover:border-ink"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  )
}
