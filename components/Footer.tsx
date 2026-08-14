export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-ink/70 sm:flex-row">
        <p>The Bitcoin Brief &copy; {new Date().getFullYear()}</p>
        <p className="text-xs">
          Published on{' '}
          <a
            href="https://nostr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            Nostr
          </a>
        </p>
      </div>
    </footer>
  )
}
