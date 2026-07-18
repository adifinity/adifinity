import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'
import { clean } from '@/lib/entry-meta'
import type { ProseImageDims, SanityImageValue } from '@/sanity/lib/queries'

// A captioned image plate. Renders nothing when no asset exists — the
// archive never shows an empty frame.
//
// Two sizing modes:
// - crop (default): explicit width/height, hotspot-aware Sanity crop.
//   For photographic covers and listing plates.
// - intrinsic: when the image's real dimensions are known, the asset is
//   scaled to fit without any cropping — diagrams, charts, scanned
//   documents and slides keep their full legibility, and the reserved
//   ratio matches exactly, so there is still no layout shift.
export function Plate({
  image,
  width,
  height,
  sizes,
  className,
  intrinsic,
  figure,
}: {
  image: SanityImageValue | null | undefined
  width: number
  height: number
  sizes: string
  className?: string
  intrinsic?: ProseImageDims | null
  figure?: number
}) {
  if (!image?.asset?._ref) return null

  const src = intrinsic
    ? urlFor(image).width(1400).fit('max').auto('format').url()
    : urlFor(image).width(width * 2).height(height * 2).fit('crop').auto('format').url()
  const displayWidth = width
  const displayHeight = intrinsic
    ? Math.round((intrinsic.height / intrinsic.width) * width)
    : height
  const caption = image.caption
  const credit = image.credit

  return (
    <figure className={`plate ${className ?? ''}`}>
      <Image
        src={src}
        alt={clean(image.alt) ?? ''}
        width={displayWidth}
        height={displayHeight}
        sizes={sizes}
        className="h-auto w-full"
      />
      {(caption || credit || figure != null) && (
        <figcaption>
          {figure != null && `Fig. ${figure}`}
          {figure != null && (caption || credit) && ' — '}
          {caption}
          {caption && credit && ' · '}
          {credit}
        </figcaption>
      )}
    </figure>
  )
}
