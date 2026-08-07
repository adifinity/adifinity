import Image from 'next/image'

import { clean } from '@/lib/entry-meta'
import { urlFor } from '@/sanity/lib/image'
import type { LinkedEvidence } from '@/sanity/lib/queries'

// A linked visual-evidence plate: a screenshot of an external post whose
// IMAGE and CITATION both open the original source in a new tab. Same
// archival plate aesthetic as <Plate> (intrinsic, uncropped), but the
// image is wrapped in a semantic external link, with the citation as a
// sibling link — never nested. The local image survives even if the
// external URL later rots.
export function EvidencePreview({
  item,
  figure,
}: {
  item: LinkedEvidence
  figure: number
}) {
  const image = item.image
  if (!image?.asset?._ref) return null

  const url = clean(item.url)
  const source = clean(item.source)
  const platform = clean(item.platform)
  const titleText = clean(item.title)
  const dims = image.dims
  const displayWidth = 800
  const displayHeight = dims ? Math.round((dims.height / dims.width) * displayWidth) : 533
  const src = urlFor(image).width(1400).fit('max').auto('format').url()

  // Accessible name describes the ACTION/DESTINATION, not the screenshot
  // (the screenshot is described by the image's alt text instead).
  const destination = platform ? `on ${platform}` : source ? `at ${source}` : 'at the original source'
  const linkLabel = `View the original ${titleText ?? 'post'} ${destination} (opens in a new tab)`
  const hasCitation = Boolean(source || platform)

  const imageEl = (
    <Image
      src={src}
      alt={clean(image.alt) ?? ''}
      width={displayWidth}
      height={displayHeight}
      sizes="(min-width: 1024px) 800px, 100vw"
      className="h-auto w-full"
    />
  )

  return (
    <figure className="plate">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={linkLabel}
          className="group block transition-opacity hover:opacity-95"
        >
          {imageEl}
        </a>
      ) : (
        imageEl
      )}
      <figcaption className="mt-3">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-mono text-meta uppercase text-graphite">Fig. {figure}</span>
          {item.title && <span className="font-serif text-caption text-ink">{item.title}</span>}
        </p>
        {image.caption && (
          <p className="mt-1 max-w-[52ch] font-serif text-caption text-graphite">{image.caption}</p>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel}
            className="mt-1 inline-flex items-baseline gap-1 break-words font-mono text-meta uppercase text-graphite underline decoration-1 underline-offset-4 transition-colors hover:text-annotation"
          >
            <span>
              {hasCitation ? (
                <>
                  {item.source}
                  {item.source && item.platform && ' · '}
                  {item.platform}
                </>
              ) : (
                'View original'
              )}
            </span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </figcaption>
    </figure>
  )
}
