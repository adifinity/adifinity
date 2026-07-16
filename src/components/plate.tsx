import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'
import { clean } from '@/lib/entry-meta'
import type { SanityImageValue } from '@/sanity/lib/queries'

// A captioned image plate. Renders nothing when no asset exists — the
// archive never shows an empty frame. Dimensions are explicit so images
// can never cause layout shift; the source is requested at 2× for
// sharpness and cropped to the plate's aspect via Sanity (hotspot-aware).
export function Plate({
  image,
  width,
  height,
  sizes,
  className,
}: {
  image: SanityImageValue | null | undefined
  width: number
  height: number
  sizes: string
  className?: string
}) {
  if (!image?.asset?._ref) return null

  const src = urlFor(image).width(width * 2).height(height * 2).fit('crop').auto('format').url()
  const caption = image.caption
  const credit = image.credit

  return (
    <figure className={`plate ${className ?? ''}`}>
      <Image
        src={src}
        alt={clean(image.alt) ?? ''}
        width={width}
        height={height}
        sizes={sizes}
        className="h-auto w-full"
      />
      {(caption || credit) && (
        <figcaption>
          {caption}
          {caption && credit && ' · '}
          {credit}
        </figcaption>
      )}
    </figure>
  )
}
