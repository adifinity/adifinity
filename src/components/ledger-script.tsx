// The Ledger Sort arrival gate. Rendered only when the homepage is
// eligible (featured entry + enough fragments, decided server-side),
// and placed before the opening section so it executes synchronously
// during HTML parsing — before first paint.
//
// It decides, pre-paint and pre-hydration, whether this arrival plays
// the signature sequence: reduced motion skips it, and one play per
// browser-tab session (sessionStorage) keeps it an arrival signature
// rather than a recurring obstacle. Only when it will play does it set
// data-ledger="pending" on <html>, which the CSS in globals.css uses to
// hold participants invisible until the controller takes over. The
// 2.5s timeout is the failsafe: if the controller never runs, the
// settled page reveals itself.
//
// In development builds only, `?ledger=replay` re-arms the sequence for
// testing. It never bypasses the reduced-motion check.
const isDev = process.env.NODE_ENV === 'development'

const SCRIPT = [
  '(function(){try{',
  `var replay=${isDev ? "location.search.indexOf('ledger=replay')>-1" : 'false'};`,
  "if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;",
  "var key='adifinity:ledger-sort:v1';",
  'if(!replay&&sessionStorage.getItem(key))return;',
  "sessionStorage.setItem(key,'1');",
  'var d=document.documentElement;',
  "d.setAttribute('data-ledger','pending');",
  "setTimeout(function(){if(d.getAttribute('data-ledger')==='pending')d.removeAttribute('data-ledger');},2500);",
  '}catch(e){}})();',
].join('')

export function LedgerScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
