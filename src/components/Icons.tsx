import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const

const solid = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, focusable: false } as const

export const ArrowUpRight = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const Download = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
  </svg>
)
export const Mail = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </svg>
)
export const Phone = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)
export const MapPin = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
export const Code = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
  </svg>
)
export const Menu = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)
export const Close = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const Chevron = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)
export const GradCap = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M2 9l10-5 10 5-10 5L2 9Z" />
    <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
  </svg>
)
export const Compass = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
)
export const Cube = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
    <path d="M4 7.5 12 12l8-4.5M12 12v9" />
  </svg>
)
export const Users = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.5a6 6 0 0 1 3 5.5" />
  </svg>
)
export const Terminal = (p: IconProps) => (
  <svg {...stroke} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="m7 10 3 2-3 2M12.5 15H17" />
  </svg>
)
export const Github = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
)
export const Linkedin = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
)
