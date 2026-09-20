import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/resume'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'

export function Experience() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="experience" title="Experience" lede="An AI/ML internship at Infosys.">
      <div ref={track} className="relative pl-9 sm:pl-16">
        {/* timeline rail */}
        <div aria-hidden className="absolute bottom-0 left-[0.6rem] top-2 w-px bg-white/10 sm:left-[1.4rem]">
          <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-gradient-to-b from-ice to-iris" />
        </div>

        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={job.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.05rem] top-9 grid size-4 place-items-center rounded-full border border-ice/60 bg-void sm:-left-[3.1rem] sm:size-5"
              >
                <span className="size-1.5 rounded-full bg-ice shadow-[0_0_14px_2px_var(--color-ice)] sm:size-2" />
              </span>

              <Reveal>
                <article className="glass rounded-[1.75rem] p-6 sm:p-9">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="font-display text-5xl leading-none sm:text-6xl">{job.company}</h3>
                      <p className="mt-3 text-lg text-paper/90">{job.role}</p>
                    </div>
                    <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-mist">
                      {job.period}
                    </p>
                  </div>

                  <ul className="mt-8 max-w-2xl space-y-4">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3.5 leading-relaxed text-paper/85">
                        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ice" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* The three practices named in the second bullet, shown as a flow */}
                  <div className="mt-9 border-t border-white/[0.08] pt-7">
                    <p className="mb-4 text-sm text-mist">AI/ML project work</p>
                    <ol className="grid gap-3 sm:grid-cols-3">
                      {job.workflow.map((step, i) => (
                        <li
                          key={step}
                          className="relative rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[0.9375rem] font-medium text-paper"
                        >
                          <span className="mr-2 text-ice">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
