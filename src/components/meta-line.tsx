// One mono metadata line: derived parts (catalog codes, labels, dates)
// joined with the archive's interpunct. Editorial CMS prose must not be
// passed through here — derived strings only, so joining is stega-safe.
export function MetaLine({
  parts,
  className,
}: {
  parts: (string | null | undefined)[]
  className?: string
}) {
  const text = parts.filter(Boolean).join(' · ')
  if (!text) return null
  return <p className={`font-mono text-meta uppercase text-graphite ${className ?? ''}`}>{text}</p>
}
