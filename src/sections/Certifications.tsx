import { certifications } from '../data/resume'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications & assessments"
      lede="Cloud, databases, software engineering, generative AI and communication."
      className="pt-4 sm:pt-8"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {certifications.map((c, i) => (
          <li key={c.id} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Reveal delay={(i % 3) * 0.07} className="h-full">
              <TiltCard max={4} className="h-full">
                <article className="surface relative h-full overflow-hidden rounded-[1.5rem] p-6 sm:p-7">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/60 to-transparent"
                  />
                  <p className="text-sm text-mist">{c.date}</p>
                  <h3 className="mt-4 font-display text-3xl leading-none">{c.issuer}</h3>
                  <p className="mt-3 text-paper/90">{c.title}</p>
                  {c.score && (
                    <p className="mt-5 flex items-baseline gap-3">
                      <span className="font-display text-4xl leading-none text-ice">{c.score}</span>
                      <span className="text-sm text-mist">{c.detail}</span>
                    </p>
                  )}
                  {!c.score && c.detail && <p className="mt-1 text-sm text-mist">{c.detail}</p>}
                </article>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
