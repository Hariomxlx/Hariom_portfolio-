import { education } from '../data/resume'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

type Entry = (typeof education)[number]

function EducationCard({ entry, featured }: { entry: Entry; featured?: boolean }) {
  return (
    <TiltCard max={3} className="h-full">
      <article
        className={`surface flex h-full flex-col rounded-[1.75rem] ${featured ? 'p-7 sm:p-10' : 'p-6 sm:p-7'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-mist">{entry.period}</p>
          {entry.current && (
            <span className="inline-flex items-center gap-2 rounded-full border border-ice/30 bg-ice/[0.08] px-3 py-1 text-xs text-ice">
              <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-ice" />
              In progress
            </span>
          )}
        </div>
        <h3
          className={`mt-5 font-display leading-[1.02] ${featured ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'}`}
        >
          {entry.degree}
        </h3>
        <p className={`mt-3 text-paper/90 ${featured ? 'text-xl' : 'text-lg'}`}>{entry.institution}</p>
        <p className="mt-1 text-mist">{entry.place}</p>

        {featured ? (
          <div className="mt-10 border-t border-white/[0.08] pt-6 lg:mt-auto">
            <p className="text-sm text-mist">{entry.score.label}</p>
            <p className="mt-1 font-display text-6xl leading-none text-ice sm:text-7xl">{entry.score.value}</p>
          </div>
        ) : (
          <p className="mt-6 inline-flex w-fit items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm">
            <span className="text-mist">{entry.score.label}</span>
            <span className="font-medium text-paper">{entry.score.value}</span>
          </p>
        )}
      </article>
    </TiltCard>
  )
}

export function Education() {
  const [current, ...earlier] = education
  return (
    <Section id="education" title="Education">
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Reveal>
          <EducationCard entry={current} featured />
        </Reveal>
        <div className="grid gap-4">
          {earlier.map((entry, i) => (
            <Reveal key={entry.id} delay={0.08 * (i + 1)}>
              <EducationCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
