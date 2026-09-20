import type { ReactNode } from 'react'
import { site } from '../data/resume'
import { ArrowUpRight, Code, Download, Github, Linkedin, Mail, MapPin, Phone } from '../components/Icons'
import { MagneticButton } from '../components/MagneticButton'
import { Reveal } from '../components/Reveal'

type Row = { label: string; value: string; href?: string; icon: ReactNode; external?: boolean }

export function Contact() {
  const rows: Row[] = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <Mail /> },
    {
      label: 'LinkedIn',
      value: 'hariom-kumar-68b82b2ab',
      href: site.links.linkedin,
      icon: <Linkedin />,
      external: true,
    },
    { label: 'GitHub', value: 'Hariomxlx', href: site.links.github, icon: <Github />, external: true },
    { label: 'LeetCode', value: 'Hariom49', href: site.links.leetcode, icon: <Code />, external: true },
    ...(site.showPhone
      ? [{ label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/-/g, '')}`, icon: <Phone /> }]
      : []),
    { label: 'Location', value: site.location, icon: <MapPin /> },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-[90svh] items-center px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal className="text-center">
          <h2
            id="contact-title"
            className="mx-auto max-w-4xl font-display text-[clamp(3.25rem,9.5vw,8rem)] leading-[0.92] tracking-tight"
          >
            Let&rsquo;s build something meaningful.
          </h2>
          <p className="mx-auto mt-7 max-w-md text-lg text-mist">
            Write to me by email, or find me on LinkedIn and GitHub.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href={`mailto:${site.email}`} variant="primary">
              <Mail width={18} height={18} />
              Email me
            </MagneticButton>
            <MagneticButton href={site.resume.href} download={site.resume.fileName} variant="ghost">
              <Download width={18} height={18} />
              Download Resume
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <ul className="glass grid gap-px overflow-hidden rounded-[1.75rem] bg-white/[0.06] sm:grid-cols-2">
            {rows.map((row) => {
              const inner = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-ice">
                    {row.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-mist">{row.label}</span>
                    <span className="block break-words text-[0.9375rem] text-paper">{row.value}</span>
                  </span>
                  {row.href && (
                    <ArrowUpRight
                      width={16}
                      height={16}
                      className="ml-auto shrink-0 text-mist opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  )}
                </>
              )
              return (
                <li key={row.label} className="bg-void/70">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? '_blank' : undefined}
                      rel={row.external ? 'noopener noreferrer' : undefined}
                      className="group flex h-full items-center gap-4 p-5 transition-colors hover:bg-white/[0.04] sm:p-6"
                    >
                      {inner}
                      {row.external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  ) : (
                    <div className="flex h-full items-center gap-4 p-5 sm:p-6">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
