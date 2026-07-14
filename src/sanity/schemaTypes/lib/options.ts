// Shared option lists for select/radio fields, kept in one place so the
// same wording and values are used everywhere a field reuses this concept.

export const STATUS_OPTIONS = [
  {title: 'Draft', value: 'draft'},
  {title: 'Published', value: 'published'},
  {title: 'Archived', value: 'archived'},
]

export const VISIBILITY_OPTIONS = [
  {title: 'Public', value: 'public'},
  {title: 'Unlisted', value: 'unlisted'},
  {title: 'Private', value: 'private'},
]

// Used by workItem and experience to keep the four content categories
// (demonstrated / current / developing / aspirational) explicit and
// never blurred together, per the Adifinity content principle.
export const CONTENT_PHASE_OPTIONS = [
  {title: 'Demonstrated — shipped or completed', value: 'demonstrated'},
  {title: 'Current — actively in progress', value: 'current'},
  {title: 'Developing — a capability being built up', value: 'developing'},
  {title: 'Aspirational — direction, not yet real', value: 'aspirational'},
]

export const PRIMARY_CATEGORY_OPTIONS = [
  {title: 'Finance & Strategy', value: 'financeStrategy'},
  {title: 'Policy & Research', value: 'policyResearch'},
  {title: 'Institutions & Leadership', value: 'institutionsLeadership'},
  {title: 'Writing & Communication', value: 'writingCommunication'},
]
