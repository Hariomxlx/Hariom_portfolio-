import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectFilters, projects, type Project, type ProjectCategory } from '../data/resume'
import { ArrowUpRight, Chevron, Github } from '../components/Icons'
import { EASE, Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { TiltCard } from '../components/TiltCard'

/* ------------------------------------------------------------------ */
/* Schematic previews. They're drawn from what the resume says each    */
/* project contains: roles, features, layers. No screenshots are faked.*/
/* ------------------------------------------------------------------ */

function PreviewFrame({
  children,
  label,
  features,
  ratio = 'aspect-[4/3]',
}: {
  children: ReactNode
  label: string
  features: readonly string[]
  ratio?: string
}) {
  return (
    <div className="p3d relative w-full rounded-[1.4rem] border border-white/10 bg-[radial-gradient(120%_100%_at_30%_0%,rgb(141_185_255/0.14),transparent_60%),linear-gradient(180deg,rgb(255_255_255/0.03),rgb(255_255_255/0.01))]">
      {/* dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] opacity-60 [background-image:radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <div role="img" aria-label={label} className={`p3d relative w-full ${ratio}`}>
        {children}
      </div>
      <ul
        aria-label="Features"
        className="relative flex flex-wrap justify-center gap-1.5 px-3 pb-4 pt-1"
        style={{ transform: 'translateZ(46px)' }}
      >
        {features.map((f) => (
          <li key={f} className="rounded-full border border-white/10 bg-void/80 px-2.5 py-1 text-[0.6875rem] text-paper/90">
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RoleNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x - 62} y={y - 18} width="124" height="36" rx="18" fill="rgb(12 14 19 / 0.9)" stroke="rgb(141 185 255 / 0.5)" />
      <text x={x} y={y + 5.5} textAnchor="middle" fontSize="16" fill="#ecebe7">
        {label}
      </text>
    </g>
  )
}

function UsisPreview({ project }: { project: Project }) {
  return (
    <PreviewFrame
      label="Diagram: USIS serves three roles, Students, Mentors and Administrators."
      features={project.features}
      ratio="aspect-[400/236]"
    >
      <svg viewBox="0 0 400 236" className="absolute inset-0 h-full w-full" style={{ transform: 'translateZ(20px)' }}>
        <g fill="none" stroke="rgb(141 185 255 / 0.55)" strokeWidth="1.2">
          <path className="flow" d="M112 54 L176 90" />
          <path className="flow" d="M288 54 L224 90" />
          <path className="flow" d="M200 150 L200 182" />
        </g>
        <circle cx="200" cy="112" r="38" fill="rgb(141 185 255 / 0.1)" stroke="rgb(141 185 255 / 0.7)" />
        <text
          x="200"
          y="121"
          textAnchor="middle"
          fontSize="27"
          fill="#ecebe7"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          USIS
        </text>
        <RoleNode x={74} y={36} label="Students" />
        <RoleNode x={326} y={36} label="Mentors" />
        <RoleNode x={200} y={200} label="Administrators" />
      </svg>
    </PreviewFrame>
  )
}

function StackPreview({ project }: { project: Project }) {
  if (project.preview.kind !== 'stack') return null
  const { label, layers } = project.preview
  return (
    <PreviewFrame label={label} features={project.features} ratio="aspect-square sm:aspect-[4/3]">
      {/* Own 3D context: keeps the tilted layers from cutting through the frame's dot grid. */}
      <div aria-hidden className="absolute inset-0 flex items-center px-[9%] pb-10" style={{ perspective: 900 }}>
        <div
          className="p3d flex w-full flex-col gap-3.5"
          style={{ transform: 'rotateX(14deg) rotateY(-14deg)' }}
        >
          {layers.map((l, i) => (
            <div
              key={l.title}
              className="rounded-2xl border border-ice/25 bg-[rgb(14_18_28/0.92)] px-4 py-3.5"
              style={{ transform: `translateZ(${i * 26}px)` }}
            >
              <p className="text-sm font-medium text-paper">{l.title}</p>
              <p className="text-xs text-mist">{l.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  )
}

/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const titleId = `${project.id}-title`
  const panelId = `${project.id}-details`

  return (
    <Reveal>
      <TiltCard max={2.5} className="rounded-[2rem]">
        <article
          aria-labelledby={titleId}
          className="surface p3d grid gap-8 rounded-[2rem] p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10"
        >
          {project.preview.kind === 'usis' ? <UsisPreview project={project} /> : <StackPreview project={project} />}

          <div>
            <p className="text-sm text-mist">{project.period}</p>
            <h3 id={titleId} className="mt-2 font-display text-4xl leading-[1.02] sm:text-5xl">
              {project.name.split(' ').map((word, i) => (
                <span key={i} className={word.includes('-') ? 'whitespace-nowrap' : undefined}>
                  {i > 0 && ' '}
                  {word}
                </span>
              ))}
            </h3>
            <p className="mt-4 max-w-prose leading-relaxed text-paper/85">{project.summary}</p>

            <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                {open ? 'Hide details' : 'View details'}
                <Chevron
                  width={16}
                  height={16}
                  className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-void transition-colors hover:bg-white"
                >
                  Live demo
                  <ArrowUpRight width={15} height={15} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
                  project.demo
                    ? 'border border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]'
                    : 'bg-paper text-void hover:bg-white'
                }`}
              >
                <Github width={16} height={16} />
                View on GitHub
                <ArrowUpRight width={15} height={15} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-7">
                    <h4 className="text-sm text-mist">{project.detailsHeading ?? 'My contribution'}</h4>
                    <ul className="mt-3 space-y-3.5">
                      {project.details.map((c) => (
                        <li key={c} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-paper/85">
                          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ice" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const count = (id: 'all' | ProjectCategory) => (id === 'all' ? projects.length : projects.filter((p) => p.category === id).length)

  return (
    <Section
      id="projects"
      title="Projects"
      lede="Full-stack applications and applied AI/ML work, newest first."
    >
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2 sm:mb-10">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
              filter === f.id
                ? 'border-ice/60 bg-ice/10 text-paper'
                : 'border-white/12 bg-white/[0.03] text-mist hover:border-white/30 hover:text-paper'
            }`}
          >
            {f.label}
            <span className="text-xs text-mist">{count(f.id)}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6 sm:space-y-8">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  )
}
