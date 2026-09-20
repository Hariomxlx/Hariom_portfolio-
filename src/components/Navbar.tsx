import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { navItems, sectionIds, site } from '../data/resume'
import { useActiveSection } from '../hooks/useActiveSection'
import { Close, Download, Menu } from './Icons'
import { EASE } from './Reveal'

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  const isActive = (item: (typeof navItems)[number]) => active === item.id || active === item.alsoActiveOn

  const close = useCallback(() => setOpen(false), [])

  const goTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const wasOpen = open
      setOpen(false)
      // Give the scroll lock a frame to release before scrolling on mobile.
      window.setTimeout(
        () => {
          document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
          history.replaceState(null, '', `#${id}`)
        },
        wasOpen ? 80 : 0,
      )
    },
    [open, reduce],
  )

  // Lock page scroll, close on Escape, and keep Tab focus inside the open menu.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []),
      ].filter((el): el is HTMLElement => !!el)

    focusables()[1]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mql.matches && close()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [close])

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-px w-full origin-left bg-gradient-to-r from-ice to-iris"
      />

      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
        {/* Desktop: floating pill */}
        <nav
          aria-label="Primary"
          className="glass pointer-events-auto hidden items-center gap-1 rounded-full p-1.5 pl-2 lg:flex"
        >
          <a
            href="#home"
            onClick={(e) => goTo(e, 'home')}
            aria-label="Hariom Kumar, back to top"
            className="grid size-9 place-items-center rounded-full font-display text-xl leading-none"
          >
            {site.initials}
          </a>
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  aria-current={isActive(item) ? 'true' : undefined}
                  className={`relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                    isActive(item) ? 'text-paper' : 'text-mist hover:text-paper'
                  }`}
                >
                  {isActive(item) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-inset ring-white/10"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-full bg-paper px-4 text-xs font-medium text-void transition-colors hover:bg-white"
          >
            <Download width={14} height={14} />
            Resume
          </a>
        </nav>

        {/* Mobile / tablet: compact bar with hamburger */}
        <div className="glass pointer-events-auto flex w-full max-w-md items-center justify-between rounded-full py-1.5 pl-2 pr-1.5 lg:hidden">
          <a
            href="#home"
            onClick={(e) => goTo(e, 'home')}
            aria-label="Hariom Kumar, back to top"
            className="grid size-10 place-items-center rounded-full font-display text-xl leading-none"
          >
            {site.initials}
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-paper transition-colors hover:bg-white/10"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => goTo(e, item.id)}
                    aria-current={isActive(item) ? 'true' : undefined}
                    className={`block py-1.5 font-display text-[2.75rem] leading-tight transition-colors ${
                      isActive(item) ? 'text-paper' : 'text-mist hover:text-paper'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={site.resume.href}
              download={site.resume.fileName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 inline-flex h-12 w-fit items-center gap-2.5 rounded-full bg-paper px-6 font-medium text-void"
            >
              <Download width={18} height={18} />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
