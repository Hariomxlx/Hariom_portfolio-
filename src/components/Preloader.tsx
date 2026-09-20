import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from './Reveal'

/** Short page-load moment: monogram + a line that draws itself, then a fade. */
export function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          <motion.div
            className="relative"
            exit={{ scale: 1.06, transition: { duration: 0.7, ease: EASE } }}
          >
            <motion.span
              className="block font-display text-7xl leading-none text-paper"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              HK
            </motion.span>
            <motion.span
              className="absolute -bottom-4 left-0 h-px w-full origin-left bg-gradient-to-r from-ice to-iris"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
