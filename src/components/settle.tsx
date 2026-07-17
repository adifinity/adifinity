'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

import { DURATION, EASE_SETTLE, SETTLE_DISTANCE } from '@/lib/motion-tokens'

// The one shared reveal primitive: fade in with a small downward-to-rest
// settle. Rendered inside a MotionConfig with reducedMotion="user", the
// transform is dropped automatically for reduced-motion users and only a
// brief opacity change remains — final states always arrive.
export function Settle({
  delay = 0,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: SETTLE_DISTANCE }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.reveal, ease: EASE_SETTLE, delay }}
      {...props}
    />
  )
}
