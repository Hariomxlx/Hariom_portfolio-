# Hariom Kumar: 3D portfolio

A dark, cinematic personal portfolio built from Hariom's resume.
React 19, TypeScript, Vite, Tailwind CSS v4, Three.js with React Three Fiber, Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes ./dist
npm run preview    # serves ./dist locally
```

Needs Node 20 or newer.

## Change the content

Every word, date and link on the site lives in **`src/data/resume.ts`**. Edit that one file.
To update the download, replace `public/Hariom_Kumar_Resume.pdf` (keep the file name).

- **Add a project:** copy one object in the `projects` list in `src/data/resume.ts` and edit it.
  `category` is `'ai-ml'` or `'full-stack'` (it drives the filter buttons), `demo` is optional, and
  `preview` is either `{ kind: 'usis' }` or a `{ kind: 'stack', label, layers }` diagram with up to three layers.
  Keep every line true to the project's README or your resume.
- `site.showPhone`: set to `false` to hide the phone number from the contact section.
- Nothing is invented. Project diagrams are drawn from the resume's own wording (roles, features, layers), not fake screenshots.
  If you add real screenshots later, drop them in `public/images` and render them inside `ProjectCard` in `src/sections/Projects.tsx`.

## Deploy

`npm run build`, then upload `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
Asset paths are relative (`base: './'`), so it works from a sub-path too.

**Before sharing the link:** in `index.html`, change the `og:image` value to an absolute URL such as
`https://your-domain.com/images/og-image.jpg`, otherwise link previews on LinkedIn, WhatsApp and Slack won't show the image.

## How it is put together

```
src/
  data/resume.ts        all content
  sections/             Hero, About, Experience, Projects, Skills, Education, Certifications, Contact
  components/           Navbar, Preloader, MagneticButton, TiltCard, Reveal, Section, Icons
  components/three/     Scene (lazy chunk), CameraRig, Particles, Crystal, Floor
  lib/motionSync.ts     scroll + pointer -> shared state read by the 3D scene each frame
```

- **3D scene**: one fixed WebGL canvas behind the page. The camera descends as you scroll and drifts toward the pointer;
  a low-poly crystal moves to a new spot for each section. Three.js is a separate chunk loaded when the browser is idle, so text and photo paint first.
- **Mobile**: fewer particles, lower pixel ratio, dimmer crystal, no pointer effects, hamburger menu with focus trap.
- **Performance guard**: the pixel ratio drops automatically if the frame rate stays under 40 fps.
- **Reduced motion**: the intro, tilt, magnetic buttons, camera drift and spinning are switched off; the scene renders a still frame.
- **No WebGL**: the 3D layer is skipped and the page works as a normal dark site.
- **Accessibility**: skip link, landmarks, visible focus rings, keyboard-operable menu and project details, alt text, external links announce that they open a new tab.
- **SEO**: title, description, Open Graph tags, JSON-LD `Person` data (all from the resume), `robots.txt`.
