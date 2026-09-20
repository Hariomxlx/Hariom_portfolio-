/**
 * Mutable animation state shared between the DOM (scroll / pointer listeners)
 * and the WebGL scene. Kept outside React so the render loop can read it
 * every frame without triggering re-renders.
 */
export const motionState = {
  /** 0..1 page scroll progress */
  scroll: 0,
  /** damped copy of scroll, written by the camera rig */
  sScroll: 0,
  /** float section index: 1.5 means halfway between section 1 and 2 */
  section: 0,
  /** pointer position, -1..1 (y is up) */
  px: 0,
  py: 0,
  /** damped copies of the pointer */
  sx: 0,
  sy: 0,
}
