import { lazy, Suspense, useEffect, useState } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { sectionIds } from './data/resume'
import { IntroContext } from './components/IntroContext'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { useFinePointer } from './hooks/useMedia'
import { whenIdle } from './lib/idle'
import { hasWebGL, startMotionSync } from './lib/motionSync'
import { About } from './sections/About'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

// three.js and React Three Fiber live in their own chunk, loaded after first paint.
const Scene = lazy(() => import('./components/three/Scene'))

export default function App() {
  const reduce = useReducedMotion() ?? false
  const fine = useFinePointer()
  const [introDone, setIntroDone] = useState(false)
  const [scene, setScene] = useState(false)

  // Page-load moment. Skipped entirely for visitors who prefer reduced motion.
  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), reduce ? 0 : 1300)
    return () => window.clearTimeout(id)
  }, [reduce])

  // Mount the WebGL scene once the browser is idle, so it never competes with first paint.
  useEffect(() => {
    if (!hasWebGL()) return
    return whenIdle(() => setScene(true))
  }, [])

  // Scroll / pointer -> shared state for the 3D scene.
  useEffect(() => startMotionSync(sectionIds, { pointer: fine && !reduce }), [fine, reduce])

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <a
          href="#about"
          className="sr-only z-[110] rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {scene && (
          <Suspense fallback={null}>
            <Scene reduced={reduce} />
          </Suspense>
        )}
        <div aria-hidden className="vignette" />
        <div aria-hidden className="grain" />

        <Preloader done={introDone} />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Contact />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </IntroContext.Provider>
    </MotionConfig>
  )
}
