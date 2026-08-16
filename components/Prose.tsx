import { marked } from 'marked'

const PROSE_CLASSES =
  'max-w-none font-serif text-lg leading-relaxed text-ink/90 ' +
  '[&_a]:text-accent [&_a]:underline ' +
  '[&_blockquote]:border-l-4 [&_blockquote]:border-accent/40 [&_blockquote]:pl-4 [&_blockquote]:italic ' +
  '[&_h1]:mb-6 [&_h1]:font-serif [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-tight ' +
  '[&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-bold ' +
  '[&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-bold ' +
  '[&_hr]:my-8 [&_hr]:border-gray-200 ' +
  '[&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6'

export function Prose({ markdown, className }: { markdown: string; className?: string }) {
  const html = marked.parse(markdown) as string
  return (
    <div
      className={className ? `${PROSE_CLASSES} ${className}` : PROSE_CLASSES}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
