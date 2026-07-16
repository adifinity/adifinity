// Mono annotation-layer heading used by every homepage section.
export function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-mono text-meta uppercase text-graphite">
      {children}
    </h2>
  )
}
