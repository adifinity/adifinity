# Adifinity

Adifinity is the personal site and living archive of **Raiyan Sadi Aditya**,
also known as **Adi**.

It is not a conventional résumé site and not an agency landing page. Treat
every design and content decision as building an evolving personal archive,
not a static marketing brochure.

## Stack

- **Next.js** (App Router) with **TypeScript**
- **Tailwind CSS** for styling
- **Sanity** (with Visual Editing) as the content backend
- **GSAP** and **Motion** for animation
- **Vercel** for hosting, **GitHub** for source control

Not all of these are installed yet — the project currently only has the
Next.js + TypeScript + Tailwind foundation. Sanity, GSAP, and Motion will be
added in later milestones.

## Design direction: Marginalia

The guiding metaphor is **Marginalia** — an annotated personal library and
an evolving working archive, not a polished portfolio. Layouts, typography,
and interaction design should feel like notes in the margins of an ongoing
body of work: dated, annotated, revisable, alive.

## Sitemap

- Home
- Story
- Work
- Now
- Notes
- Field Notes
- Archive
- Contact

## Content principle

Professional/work content must always distinguish between:

1. **Demonstrated work** — things actually shipped or completed
2. **Current work** — things actively in progress right now
3. **Developing capabilities** — skills being actively built up
4. **Future aspirations** — direction and intent, not yet real

Never blur these categories together. Be explicit about which one any given
piece of content belongs to.

## Working agreements

- **Ask before installing any package** that hasn't been previously approved
  by Adi, including the Sanity/GSAP/Motion packages listed above when the
  time comes to add them.
- **Never commit secrets, API tokens, or `.env.local` files.** Environment
  files are already excluded via `.gitignore` — keep it that way.
- **Preserve accessibility, responsive design, reduced-motion support, and
  performance** in every change. This is a non-negotiable baseline, not a
  later pass.
