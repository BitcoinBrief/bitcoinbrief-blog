export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="28" height="28" rx="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 9h8a3.2 3.2 0 0 1 0 6.4h-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 15.4h9a3.2 3.2 0 0 1 0 6.4h-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M14 6.5v2.2M14 23.3v2.2M18 6.5v2.2M18 23.3v2.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" width="14" height="14" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 23.027L24.24 28l-2.187-9.373 7.28-6.307-9.587-.827-3.747-8.827-3.747 8.827-9.587.827 7.267 6.307L7.759 28l8.24-4.973z" />
    </svg>
  )
}

export function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.453 22.107L17.56 16l-6.107-6.12L13.333 8l8 8-8 8-1.88-1.893z" />
    </svg>
  )
}
