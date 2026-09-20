import { motion } from 'framer-motion'
import { skillGroups } from '../data/resume'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

export function Skills() {
  return (
    <Section id="skills" title="Skills" lede="The languages, frameworks and fundamentals I work with.">
      <Reveal>
        <TiltCard max={1.6} className="rounded-[2rem]">
          <div className="skills surface rounded-[2rem] p-2 sm:p-4">
            {skillGroups.map((group) => (
              <div
                key={group.name}
                className="row grid gap-4 border-b border-white/[0.07] px-4 py-6 last:border-b-0 sm:grid-cols-[17rem_1fr] sm:px-6 sm:py-7"
              >
                <h3 className="font-display text-3xl leading-tight">{group.name}</h3>
                <ul className="flex flex-wrap content-start gap-2.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <motion.span
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="chip cursor-default transition-[border-color,box-shadow,background-color] duration-300 hover:border-ice/50 hover:bg-ice/[0.07] hover:shadow-[0_0_26px_-8px_var(--color-ice)]"
                      >
                        {item}
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TiltCard>
      </Reveal>
    </Section>
  )
}
