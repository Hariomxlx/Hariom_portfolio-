import type { ReactNode } from 'react'
import { about } from '../data/resume'
import { Compass, Cube, GradCap, Terminal, Users } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

function InfoCard({
  title,
  icon,
  className = '',
  delay = 0,
  children,
}: {
  title: string
  icon: ReactNode
  className?: string
  delay?: number
  children: ReactNode
}) {
  return (
    <Reveal className={className} delay={delay}>
      <TiltCard max={3.5} className="h-full">
        <article className="surface p3d h-full rounded-[1.75rem] p-6 sm:p-8">
          <div className="flex items-center gap-3 text-ice">
            <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">{icon}</span>
            <h3 className="font-display text-3xl leading-none text-paper">{title}</h3>
          </div>
          <div className="mt-6" style={{ transform: 'translateZ(24px)' }}>
            {children}
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export function About() {
  return (
    <Section id="about" title="About me" lede={about.lede}>
      <div className="grid gap-4 md:grid-cols-6">
        <InfoCard title="Background" icon={<GradCap />} className="md:col-span-4">
          <p className="max-w-lg text-lg leading-relaxed text-paper/90">{about.background.text}</p>
          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {about.background.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm text-mist">{f.label}</dt>
                <dd className="mt-1 text-[0.9375rem] font-medium text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>
        </InfoCard>

        <InfoCard title="Professional focus" icon={<Terminal />} className="md:col-span-2" delay={0.08}>
          <p className="leading-relaxed text-paper/85">{about.focus}</p>
        </InfoCard>

        <InfoCard title="Interests" icon={<Compass />} className="md:col-span-2" delay={0.04}>
          <p className="leading-relaxed text-paper/85">{about.interests}</p>
        </InfoCard>

        <InfoCard title="Foundations" icon={<Cube />} className="md:col-span-2" delay={0.1}>
          <ul className="flex flex-wrap gap-2">
            {about.foundations.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Strengths" icon={<Users />} className="md:col-span-2" delay={0.16}>
          <ul className="flex flex-wrap gap-2">
            {about.strengths.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </InfoCard>
      </div>
    </Section>
  )
}
