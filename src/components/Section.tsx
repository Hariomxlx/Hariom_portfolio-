import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  title: string
  lede?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, lede, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <h2 id={`${id}-title`} className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          {lede && <p className="mt-5 max-w-xl text-lg text-mist">{lede}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
