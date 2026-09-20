import { useRef } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { heroFacts, site } from '../data/resume'
import { useIntroReady } from '../components/IntroContext'
import { MagneticButton } from '../components/MagneticButton'
import { Download } from '../components/Icons'
import { EASE } from '../components/Reveal'
import { useFinePointer } from '../hooks/useMedia'
import { usePointerVars } from '../hooks/usePointerVars'

const letter: Variants = {
  hidden: { y: '112%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.045 } }),
}

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: i } }),
}

/** A word whose letters slide up from behind a mask. Screen readers get the plain name from the h1's aria-label. */
function Word({ text, offset }: { text: string; offset: number }) {
  return (
    <span aria-hidden className="block overflow-hidden pb-[0.1em]">
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={letter} custom={offset + i} className="inline-block">
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero() {
  const ready = useIntroReady()
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const stage = useRef<HTMLDivElement>(null)
  usePointerVars(stage, fine && !reduce)

  const state = ready ? 'show' : 'hidden'
  const [first, last] = site.name.split(' ')

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.h1
            initial="hidden"
            animate={state}
            aria-label={site.name}
            className="font-display text-[clamp(4.25rem,13vw,9.5rem)] leading-[0.86] tracking-[-0.02em]"
          >
            <Word text={first} offset={0} />
            <Word text={last} offset={first.length} />
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={state}
            variants={rise}
            custom={0.7}
            className="mt-6 text-xl text-paper sm:mt-8 sm:text-2xl"
          >
            {site.title}
          </motion.p>
          <motion.p
            initial="hidden"
            animate={state}
            variants={rise}
            custom={0.8}
            className="mt-3 max-w-md text-base leading-relaxed text-mist sm:text-lg"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial="hidden"
            animate={state}
            variants={rise}
            custom={0.95}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="primary">
              View My Work
            </MagneticButton>
            <MagneticButton href={site.resume.href} download={site.resume.fileName} variant="ghost">
              <Download width={18} height={18} />
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          ref={stage}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
          className="stage order-1 mx-auto w-[min(44vw,15rem)] sm:w-[min(60vw,22rem)] lg:order-2 lg:w-full lg:max-w-[26rem]"
        >
          <div className="stage-inner relative aspect-[3/4] w-full">
            {/* soft light behind the portrait */}
            <div
              aria-hidden
              className="z-back absolute -inset-[18%] rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgb(110 160 255 / 0.32), rgb(140 120 255 / 0.12) 55%, transparent 100%)',
              }}
            />
            {/* offset outline for depth */}
            <div
              aria-hidden
              className="z-back arch absolute inset-0 translate-x-4 translate-y-4 border border-ice/25"
            />

            <div className="arch relative h-full w-full overflow-hidden border border-white/15 bg-graphite shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
              <img
                src={site.photo.large}
                srcSet={`${site.photo.small} 640w, ${site.photo.large} 1024w`}
                sizes="(min-width: 1024px) 26rem, 60vw"
                width={1024}
                height={1536}
                alt={site.photo.alt}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[50%_16%] [filter:saturate(0.96)_contrast(1.03)_brightness(0.93)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(6_7_10/0.7)_0%,transparent_38%),radial-gradient(120%_90%_at_50%_0%,transparent_55%,rgb(6_7_10/0.35)_100%)]"
              />
            </div>

            {/* floating facts, all taken from the resume */}
            <div className="z-front pointer-events-none absolute inset-0 hidden sm:block">
              <FloatingFact fact={heroFacts[0]} className="-left-10 bottom-[16%]" delay="0s" />
              <FloatingFact fact={heroFacts[1]} className="-right-8 top-[30%]" delay="-2.2s" />
              <FloatingFact fact={heroFacts[2]} className="-right-3 bottom-[6%]" delay="-4.4s" />
            </div>
          </div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-white/10 lg:block"
      >
        <div className="scrollcue h-full w-full bg-ice" />
      </div>
    </section>
  )
}

function FloatingFact({
  fact,
  className,
  delay,
}: {
  fact: (typeof heroFacts)[number]
  className: string
  delay: string
}) {
  return (
    <div
      className={`drift surface absolute rounded-2xl px-4 py-3 ${className}`}
      style={{ animationDelay: delay }}
    >
      <p className="text-sm font-medium leading-tight text-paper">{fact.title}</p>
      <p className="mt-0.5 text-xs text-mist">{fact.detail}</p>
    </div>
  )
}
