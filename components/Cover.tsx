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
          Welcome to The Bitcoin Brief, a legal research newsletter analyzing Bitcoin’s
          transformative potential for society.
        </p>
      </div>
    </div>
  )
}
