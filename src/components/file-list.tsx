import { clean } from '@/lib/entry-meta'
import type { FileAssetInfo } from '@/sanity/lib/queries'

function formatSize(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Supporting documents as an honest, screen-reader-clear download list:
// human-readable title first, file type and size as mono metadata, the
// Sanity asset URL with ?dl= so the browser saves a sensibly named
// file. Renders nothing when no usable files exist.
export function FileList({ files }: { files: FileAssetInfo[] | null | undefined }) {
  const usable = (files ?? []).filter((file) => clean(file.url))
  if (usable.length === 0) return null

  return (
    <ul className="mt-3 space-y-4">
      {usable.map((file, index) => {
        const url = clean(file.url) as string
        const extension = clean(file.extension)
        const size = formatSize(file.size)
        const label = file.title || 'Supporting document'
        return (
          <li key={`${url}-${index}`}>
            <a
              href={`${url}?dl=`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="font-serif text-caption text-ink underline decoration-1 underline-offset-4 transition-colors group-hover:text-annotation">
                {label}
              </span>
              <span className="mt-1 block font-mono text-meta uppercase text-graphite">
                Download
                {extension && ` · ${extension}`}
                {size && ` · ${size}`}
              </span>
            </a>
            {file.description && (
              <p className="mt-1 font-serif text-caption italic text-graphite">
                {file.description}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
