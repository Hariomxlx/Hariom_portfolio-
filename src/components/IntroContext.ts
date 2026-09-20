import { createContext, useContext } from 'react'

/** True once the page-load animation has finished; the hero waits for it. */
export const IntroContext = createContext(false)
export const useIntroReady = () => useContext(IntroContext)
