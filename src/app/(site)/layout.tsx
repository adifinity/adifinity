import {SiteShell} from '@/components/site-shell'

// Public-facing pages live in this (site) route group so they share the
// archive chrome without wrapping /studio, /test-preview, or the
// existing /work/[slug] preview route (which render their own layouts).
export default function SiteLayout({children}: {children: React.ReactNode}) {
  return <SiteShell>{children}</SiteShell>
}
