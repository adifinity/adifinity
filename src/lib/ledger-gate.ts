// The Ledger Sort arrival gate — constants for the supported
// pre-hydration path. The root layout renders this script through
// next/script with strategy="beforeInteractive" (the documented
// placement); Next injects it into the initial HTML and its bootstrap
// executes it once per document, before hydration. Root layouts persist
// across client navigations, so React never re-creates the script on
// the client — the lifecycle problem the previous raw <script> had.
//
// The gate only STAMPS a decision onto <html> — data-ledger="pending"
// (this document may play the signature) or "reveal" (show the settled
// page). It writes nothing: the session flag is committed only by the
// Ledger Sort controller when an eligible homepage takes ownership, so
// loading /studio or any other route can never consume the arrival.
// The visual hold itself is server-rendered CSS scoped to the eligible
// homepage's stage section, with a pure-CSS 2.5s failsafe reveal — if
// this gate, the bundle, or all JavaScript fails, the settled page
// still appears.
//
// In development builds only, `?ledger=replay` re-arms the sequence.
// It never overrides the reduced-motion check.

export const LEDGER_SESSION_KEY = 'adifinity:ledger-sort:v1'

const isDev = process.env.NODE_ENV === 'development'

export const LEDGER_GATE_SCRIPT = [
  '(function(){var d=document.documentElement;try{',
  `var replay=${isDev ? "location.search.indexOf('ledger=replay')>-1" : 'false'};`,
  "if(location.pathname==='/'",
  "&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches",
  `&&(replay||!sessionStorage.getItem('${LEDGER_SESSION_KEY}'))){`,
  "d.setAttribute('data-ledger','pending');",
  "}else{d.setAttribute('data-ledger','reveal');}",
  "}catch(e){d.setAttribute('data-ledger','reveal');}})();",
].join('')
