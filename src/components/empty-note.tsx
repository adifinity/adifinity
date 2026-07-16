// The archive's honest empty state — a quiet wash block with one line.
export function EmptyNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`empty-state max-w-[62ch] ${className ?? ''}`}>
      <p className="font-serif text-body italic text-graphite">{children}</p>
    </div>
  )
}
