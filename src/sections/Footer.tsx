import { site } from '../data/resume'

export function Footer() {
  return (
    <footer className="relative px-5 pb-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-sm text-mist">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <a href="#home" className="transition-colors hover:text-paper">
          Back to top
        </a>
      </div>
    </footer>
  )
}
