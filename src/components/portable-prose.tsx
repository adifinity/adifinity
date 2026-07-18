import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'

import { Plate } from './plate'
import { clean } from '@/lib/entry-meta'
import type { ProseImageDims, SanityImageValue } from '@/sanity/lib/queries'

// The shared Portable Text renderer for blockContent — Marginalia
// editorial prose. Used by Work case studies now and by Notes, Field
// Notes and Story pages in later stages. In-prose images render as
// uncropped plates (queries enrich them with intrinsic dimensions) so
// diagrams and documents stay legible.

type ProseImage = SanityImageValue & { dims?: ProseImageDims | null }

const components: PortableTextComponents = {
  types: {
    imageWithMetadata: ({ value }: { value: ProseImage }) => (
      <Plate
        image={value}
        width={680}
        height={453}
        sizes="(min-width: 1024px) 680px, 100vw"
        intrinsic={value?.dims ?? null}
        className="my-8"
      />
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mt-5 font-serif text-body text-ink">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-h2 text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-serif text-h3 text-ink">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-serif text-lede text-ink">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-annotation pl-5 font-serif text-lede italic text-graphite">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 font-serif text-body text-ink">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 font-serif text-body text-ink">
        {children}
      </ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-wash px-1 font-mono text-caption">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = clean(value?.href)
      if (!href) return <>{children}</>
      const external = value?.newTab !== false
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
        >
          {children}
        </a>
      )
    },
  },
}

export function PortableProse({
  value,
  className,
}: {
  value: PortableTextBlock[]
  className?: string
}) {
  return (
    <div className={`max-w-[62ch] ${className ?? ''}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
