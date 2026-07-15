import {IDENTITY_LINE} from '@/lib/site-copy'

// Temporary foundation-preview body — scaffolding, not the final
// homepage. The real composition (Featured Current Entry, Latest
// Update, the Ledger Sort) replaces everything below in later stages.
// No CMS queries belong here.

// Real, planned sections of the archive — not invented entries. Labels
// follow the non-sequential catalog format: TYPE · YEAR · CATEGORY.
const FORTHCOMING_SECTIONS = [
  {label: 'Work', code: 'WORK'},
  {label: 'Story', code: 'STORY'},
  {label: 'Now', code: 'NOW'},
  {label: 'Notes', code: 'NOTES'},
  {label: 'Field Notes', code: 'FIELD'},
  {label: 'Archive', code: 'ARCHIVE'},
  {label: 'Contact', code: 'CONTACT'},
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-8">
          <p className="font-mono text-meta uppercase text-graphite">Archive · Est. 2026 · Dhaka</p>
          <h1 className="mt-8 max-w-[36ch] font-serif text-statement text-ink">{IDENTITY_LINE}</h1>
        </div>
        <aside aria-label="Marginal note" className="lg:col-span-3 lg:col-start-10">
          <div className="border-t border-rule pt-4">
            <p className="font-mono text-meta uppercase text-annotation">In the margin</p>
            <p className="mt-4 font-serif text-caption italic leading-relaxed text-graphite">
              This site is being assembled in public. Work, notes, field notes, and reading will be
              filed here as each section of the archive opens.
            </p>
            <p className="mt-6 font-mono text-meta uppercase text-graphite">Filed — Jul 2026</p>
          </div>
        </aside>
      </section>

      <section className="grid gap-12 border-t border-rule py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h2 className="font-mono text-meta uppercase text-graphite">About this archive</h2>
          <div className="mt-6 max-w-[62ch] space-y-5 font-serif text-body text-ink">
            <p>
              Adifinity is a personal archive, not a portfolio. It collects the work, writing,
              reading, and travel of one person into a single catalogue — dated, categorised, and
              annotated in the margins.
            </p>
            <p>
              Every entry will say plainly what it is: work that has shipped, work in progress, and
              capabilities still being built. Nothing here is padded, and nothing is oversold.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="forthcoming-heading" className="border-t border-rule py-16">
        <h2 id="forthcoming-heading" className="font-mono text-meta uppercase text-graphite">
          Forthcoming
        </h2>
        <ul className="mt-6">
          {FORTHCOMING_SECTIONS.map((section) => (
            <li
              key={section.code}
              className="flex flex-col gap-1 border-b border-rule py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-serif text-h3 text-ink">{section.label}</span>
              <span className="font-mono text-meta uppercase text-graphite">
                {section.code} · 2026 · In preparation
              </span>
            </li>
          ))}
        </ul>
        <div className="empty-state mt-12 max-w-[62ch]">
          <p className="font-serif text-body italic text-graphite">
            Nothing is filed here yet. The archive is young.
          </p>
        </div>
      </section>
    </div>
  )
}
