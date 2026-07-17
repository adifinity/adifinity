// Motion tokens for the "settle and ink" language. These mirror the CSS
// motion foundation from Stage 1 (same easing curve, same restraint):
// things settle a few pixels and ink in — they never fly, bounce, or
// float. Durations in seconds, for Motion.
export const EASE_SETTLE = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  /** Interface controls — overlays, toggles (~200ms). */
  control: 0.2,
  /** Editorial reveals, where justified (~350ms). */
  reveal: 0.35,
  /** Exits get out of the way (~150ms). */
  exit: 0.15,
} as const

/** Maximum settle travel in px — a shift, not a journey. */
export const SETTLE_DISTANCE = 8
