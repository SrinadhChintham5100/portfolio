# Build & Deploy Guide

A complete walkthrough of how this portfolio was built, so you can understand every line, change anything with confidence, and build the next one yourself.

You already know Java and Spring well, so this guide maps front-end ideas to backend ones wherever it helps.

---

## Contents

1. [Big picture: what you're building](#1-big-picture)
2. [Install the tools](#2-install-the-tools)
3. [Run it on your machine](#3-run-it-on-your-machine)
4. [Folder tour](#4-folder-tour)
5. [How I built it, step by step](#5-how-i-built-it-step-by-step)
6. [The React concepts used, explained](#6-the-react-concepts-used)
7. [How the 3D works](#7-how-the-3d-works)
8. [How the styling works](#8-how-the-styling-works)
9. [Production-readiness checklist](#9-production-readiness-checklist)
10. [Deploy to Netlify (you do this part)](#10-deploy-to-netlify)
11. [Updating the live site later](#11-updating-the-live-site-later)
12. [Troubleshooting](#12-troubleshooting)
13. [Practice exercises](#13-practice-exercises)

---

## 1. Big picture

```
 You edit code ──► Vite bundles it ──► /dist folder ──► Netlify CDN ──► Visitors
   (src/)          (npm run build)     (static files)    (free hosting)
```

This is a **static Single Page Application (SPA)**:

- **No backend server.** The whole site is HTML + CSS + JavaScript files. Netlify just serves them from a global CDN. That's why hosting is free and fast.
- **"Single page"** means there's one `index.html`. React draws every section inside it with JavaScript, and the nav links jump between sections with `#anchors`.

| Java world | This project |
|---|---|
| Maven / Gradle | **npm** (dependencies) + **Vite** (build) |
| `pom.xml` / `build.gradle` | `package.json` |
| `~/.m2` repository | `node_modules/` |
| `target/` (built JAR) | `dist/` (built site) |
| `main()` | `src/main.jsx` |
| Classes / beans | **Components** (functions that return UI) |
| `application.yml` | `src/data.js` (all your content) |
| Jenkins / Azure DevOps pipeline | **Netlify** builds on every `git push` |

---

## 2. Install the tools

You need three things. Skip any you already have.

1. **Node.js 20 LTS** — https://nodejs.org → download the **LTS** version.
   Check it worked: open a terminal and run `node -v` (should print `v20.x` or newer) and `npm -v`.
2. **VS Code** — https://code.visualstudio.com
3. **Git** — https://git-scm.com (needed for deployment option A).

Recommended VS Code extensions (Extensions panel, `Ctrl+Shift+X`):

- **ES7+ React/Redux/React-Native snippets** — type `rfce` + Tab to scaffold a component.
- **Prettier – Code formatter** — auto-formats on save.
- **Auto Rename Tag** — renaming `<div>` also renames `</div>`.

---

## 3. Run it on your machine

1. Unzip `portfolio.zip` somewhere easy, e.g. `Documents/portfolio`.
2. In VS Code: **File → Open Folder…** → choose the `portfolio` folder.
3. Open the built-in terminal: **Terminal → New Terminal** (or `` Ctrl+` ``).
4. Run:

   ```bash
   npm install
   ```

   This reads `package.json` and downloads every library into `node_modules/` (about a minute). Same idea as `mvn install` resolving dependencies.

5. Run:

   ```bash
   npm run dev
   ```

   You'll see `Local: http://localhost:5173/`. `Ctrl+Click` it.

6. **Try hot reload:** open `src/data.js`, change your `tagline`, save. The browser updates in under a second without refreshing. This is Vite's Hot Module Replacement (HMR).

Stop the server with `Ctrl+C` in the terminal.

---

## 4. Folder tour

```
portfolio/
├── index.html            ← the single HTML page; SEO tags and fonts live here
├── package.json          ← dependencies + npm scripts (dev / build / preview)
├── package-lock.json     ← exact versions, so every install is identical
├── vite.config.js        ← build tool settings
├── netlify.toml          ← how Netlify builds + security/caching headers
├── .gitignore            ← files Git must never commit (node_modules, dist)
├── .nvmrc                ← "use Node 20" for tools that read it
├── public/               ← copied to the site as-is (no processing)
│   ├── favicon.svg       ← browser-tab icon
│   ├── resume.pdf        ← the "Download résumé" file
│   └── robots.txt        ← tells search engines they may index the site
└── src/
    ├── main.jsx          ← entry point: mounts <App/> into index.html
    ├── App.jsx           ← page layout: stacks every section in order
    ├── data.js           ← ★ ALL your content. Edit this to update the site.
    ├── styles.css        ← all styling
    └── components/
        ├── Nav.jsx         sticky top bar + mobile menu
        ├── Hero.jsx        first screen; lazy-loads the 3D scene
        ├── Scene3D.jsx     the 3D orb, rings and sparkles
        ├── Stats.jsx       "10+ years" number tiles
        ├── About.jsx       story + "what I do" cards
        ├── Highlights.jsx  selected work, cards tilt in 3D on hover
        ├── Experience.jsx  timeline with "Show more"
        ├── Skills.jsx      filterable skill groups
        ├── Education.jsx
        ├── Contact.jsx     email / LinkedIn / GitHub + copy & download buttons
        ├── Footer.jsx
        ├── Section.jsx     shared section frame (label + title)
        ├── Reveal.jsx      shared "fade up on scroll" wrapper
        └── Icon.jsx        tiny inline SVG icons
```

**The key design decision:** content (`data.js`) is separated from presentation (`components/`). You will rarely need to open a component to update your site.

---

## 5. How I built it, step by step

This is the exact order, so you can repeat it for your own project from an empty folder.

### Step 1 — Create the project

The fastest way for a new project is Vite's generator:

```bash
npm create vite@latest my-site -- --template react
cd my-site
npm install
```

I set it up by hand to keep it minimal, but the result is the same shape. Then I added the libraries:

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
```

- `three` — the 3D engine
- `@react-three/fiber` — write three.js as React components
- `@react-three/drei` — ready-made 3D helpers
- `framer-motion` — scroll and entrance animations

### Step 2 — Put the content in one file first

Before any design, I turned your résumé into structured data in `src/data.js`: arrays of objects for experience, skills, education, and so on. Doing content first means the design is built around real text lengths, not placeholder text.

I also rewrote some résumé bullets to be shorter. A website is skimmed, not read like a résumé, so the site shows the three strongest points per job with a "Show more" button for the rest.

### Step 3 — Decide the sections and the story

The page reads top to bottom like a pitch:

1. **Hero** — who you are, in five seconds
2. **Stats** — credibility at a glance
3. **About** — the story, plus six "what I do" areas
4. **Selected work** — six concrete things you built (your AI agents first, because they're the most distinctive)
5. **Experience** — the full timeline
6. **Skills** — filterable, so a recruiter looking for "Cloud" finds it instantly
7. **Education**
8. **Contact** — the call to action

### Step 4 — Build shared pieces before sections

`Section.jsx`, `Reveal.jsx` and `Icon.jsx` are used everywhere. Building them first means every section is consistent and short. Same reason you'd write a base class or a utility before the services that use it.

### Step 5 — Build each section component

Each one follows the same pattern:

```jsx
import { experience } from '../data.js';   // 1. get the data
import Section from './Section.jsx';         // 2. get shared frame

export default function Experience() {       // 3. a function that returns UI
  return (
    <Section id="experience" eyebrow="Experience" title="...">
      {experience.map((job) => <Role key={job.period} job={job} />)}  // 4. loop the data
    </Section>
  );
}
```

### Step 6 — Add the 3D scene, lazily

The 3D libraries are the heaviest part of the site (~220 KB compressed). So `Hero.jsx` loads `Scene3D.jsx` with `React.lazy()`. Your name and text appear immediately; the 3D fades in a moment later. See section 7.

### Step 7 — Style it

One CSS file with design tokens (colors, fonts) at the top. See section 8.

### Step 8 — Make it production-ready

SEO tags, accessibility, reduced-motion support, Netlify config, security headers, caching. See section 9.

### Step 9 — Test the production build

```bash
npm run build
npm run preview
```

I checked it at desktop (1440 px) and phone (390 px) widths, confirmed no console errors, and checked the mobile menu.

---

## 6. The React concepts used

Each concept below appears in the code with a comment pointing it out.

### Components and JSX

A component is a JavaScript function that returns **JSX**: HTML-like syntax inside JavaScript.

```jsx
function Greeting() {
  return <h1>Hello</h1>;
}
```

Differences from HTML you'll notice: `className` instead of `class`, and `{curly braces}` to drop in JavaScript values: `<h1>Hi, I'm {profile.name}</h1>`.

### Props: passing data into a component

Like constructor arguments.

```jsx
<Role job={job} />                 // parent passes `job`
function Role({ job }) { ... }     // child receives it
```

See `Highlights.jsx` (`TiltCard` gets `item`) and `Experience.jsx` (`Role` gets `job`).

### Rendering lists with `.map()` and `key`

```jsx
{skills.map((s) => <li key={s}>{s}</li>)}
```

`key` must be unique among siblings. React uses it to know which item is which when the list changes, much like an entity ID.

### State with `useState`

State is a variable that **re-renders the component when it changes**.

```jsx
const [expanded, setExpanded] = useState(false);
<button onClick={() => setExpanded(!expanded)}>Show more</button>
```

Used for: the mobile menu (`Nav.jsx`), "Show more" (`Experience.jsx`), the skill filter (`Skills.jsx`), and "Copied ✓" (`Contact.jsx`).

**Habit to learn:** keep state minimal and derive the rest. `Skills.jsx` stores only the selected filter name and computes the filtered list each render. It doesn't store a second copy of the data.

### Side effects with `useEffect`

For code that touches the outside world: event listeners, timers, observers.

```jsx
useEffect(() => {
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll); // cleanup
}, []); // [] = run once after the first render
```

The returned function is cleanup, like a `@PreDestroy` method. It prevents memory leaks. See `Nav.jsx` and `Hero.jsx`.

### `useRef`: a handle to a real DOM or 3D object

`useRef` gives you a reference to an element without causing re-renders. `Hero.jsx` uses one to observe the hero section; `Scene3D.jsx` uses one to rotate a ring every frame.

### Conditional rendering

```jsx
{hidden > 0 && <button>Show {hidden} more</button>}
```

If the left side is false, nothing renders. In `Contact.jsx`, `.filter(Boolean)` removes empty links, which is why the GitHub button appears by itself once you fill in the URL.

### Lazy loading with `React.lazy` + `Suspense`

```jsx
const Scene3D = lazy(() => import('./Scene3D.jsx'));
<Suspense fallback={<div className="hero__fallback" />}>
  <Scene3D />
</Suspense>
```

Vite splits `Scene3D` and everything it imports (three.js) into a separate file that downloads only when needed. `fallback` shows a soft glow meanwhile.

### Animation with Framer Motion

`motion.div` is a `div` that can animate:

```jsx
<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} />
```

`Reveal.jsx` wraps this once so every section can use `<Reveal>` without repeating it. It also checks `useReducedMotion()` and skips animation for visitors who've asked their OS for less motion.

---

## 7. How the 3D works

Open `src/components/Scene3D.jsx` next to this section.

### The mental model

A 3D scene needs four things:

1. **A canvas + camera** — `<Canvas camera={{ position: [0, 0, 6.6], fov: 45 }}>`. The camera sits 6.6 units in front of the center, looking at it.
2. **Objects (meshes)** — each is **geometry** (shape) + **material** (surface).
3. **Lights** — without them, most materials are black.
4. **A render loop** — draws ~60 frames per second.

React Three Fiber maps three.js classes to JSX tags: `new THREE.Mesh()` becomes `<mesh>`, `new THREE.SphereGeometry(1, 64, 64)` becomes `<sphereGeometry args={[1, 64, 64]} />`.

### What's in the scene

| Piece | Code | Effect |
|---|---|---|
| Orb | `sphereGeometry` + `MeshDistortMaterial` | glossy blob whose surface slowly ripples |
| Float | `<Float>` from drei | gentle bobbing up and down |
| Rings | `torusGeometry` + `useFrame` | thin orbits rotating slowly |
| Sparkles | `<Sparkles>` from drei | faint drifting particles |
| Lights | ambient + directional + two colored point lights | white highlight, teal and violet edge glow |
| Rig | `useFrame` + `state.pointer` | whole scene tilts slightly toward your mouse |

### The animation loop

```jsx
useFrame((state, delta) => {
  ref.current.rotation.z += delta * speed;
});
```

`useFrame` runs every frame. Multiplying by `delta` (seconds since the last frame) makes speed identical on a 60 Hz laptop and a 120 Hz phone.

The mouse tilt uses **linear interpolation (lerp)**: each frame it moves 4% of the way toward the target, which feels smooth instead of jumpy.

```js
current += (target - current) * 0.04;
```

### Keeping it light

You asked for animation that feels good rather than busy, so:

- Every motion is slow (rotation speeds around 0.1 rad/sec).
- `frameloop={active ? 'always' : 'never'}` stops rendering when the hero is scrolled away.
- `dpr={[1, 1.75]}` caps resolution on high-density screens to save battery.
- With "reduce motion" on, the scene is shown still.

### The other "3D": CSS tilt cards

The Selected Work cards tilt using pure CSS, not WebGL. `Highlights.jsx` writes the mouse position into CSS variables, and the CSS does:

```css
.work { perspective: 1200px; }
.work__card { transform: rotateX(var(--rx)) rotateY(var(--ry)); }
```

Writing CSS variables directly (not React state) avoids re-rendering React on every mouse move.

**Try it:** in `Scene3D.jsx`, change `distort={0.32}` to `0.6`, or the orb `color`, and save.

---

## 8. How the styling works

All in `src/styles.css`, plain CSS, no framework, so you can see every rule.

### Design tokens

The top of the file defines variables:

```css
:root {
  --bg: #0b0f17;
  --accent: #8b9bff;
  --accent-2: #5eead4;
}
```

Every color elsewhere uses `var(--accent)`. **Change the whole color scheme by editing these few lines.**

### Naming: BEM-style classes

`.block__element--modifier`, for example `.nav__links`, `.btn--ghost`, `.role__period`. The class name tells you which component owns it, so there are no collisions.

### Layout tools

- **CSS Grid** for 2-D layouts: `grid-template-columns: repeat(3, 1fr)` = three equal columns.
- **Flexbox** for rows of items: buttons, chips, nav links.
- **`clamp()`** for fluid type: `font-size: clamp(2.4rem, 5.6vw, 4.2rem)` means "scale with the screen, but never smaller than 2.4rem or larger than 4.2rem".

### Responsive design

Two breakpoints at the bottom of the file:

- `max-width: 960px` (tablets): hero stacks, 3-column grids become 2.
- `max-width: 720px` (phones): single column, hamburger menu.

Test it: in Chrome press `F12`, then the phone icon (`Ctrl+Shift+M`), and pick "iPhone 12".

### The glass-card look

`.card` uses a subtle top-to-bottom gradient, a 1 px translucent border, and `backdrop-filter: blur()`. On hover the border brightens. Small, consistent details are what make a site feel polished.

---

## 9. Production-readiness checklist

What "production setup" means here, and where each item lives:

| Concern | What's done | Where |
|---|---|---|
| Optimized build | minified, tree-shaken, hashed file names | `vite.config.js`, `npm run build` |
| Fast first paint | 3D lazy-loaded after text | `Hero.jsx` |
| Long-term caching | `/assets/*` cached 1 year (safe because names change each build) | `netlify.toml` |
| Security headers | no iframing, no MIME sniffing, strict referrer, no camera/mic | `netlify.toml` |
| Safe external links | `rel="noopener noreferrer"` | `Contact.jsx` |
| SEO | title, description, Open Graph tags, `robots.txt` | `index.html`, `public/` |
| Accessibility | skip link, focus outlines, `aria-*` labels, decorative art hidden from screen readers | throughout |
| Reduced motion | animations off when OS asks | `Reveal.jsx`, `Scene3D.jsx`, `styles.css` |
| Reproducible builds | `package-lock.json` + Node 20 pinned | root files |
| Battery friendly | 3D pauses off-screen, pixel ratio capped | `Hero.jsx`, `Scene3D.jsx` |
| No secrets in repo | `.env` ignored | `.gitignore` |

---

## 10. Deploy to Netlify

**Cost:** Netlify's Free plan has no time limit and doesn't need a credit card. It runs on a monthly credit allowance (300 credits as of 2026); a small static portfolio like this one uses very little of it. Check the current limits at https://www.netlify.com/pricing before you start.

Before deploying, open `src/data.js` and:

- [ ] Put your real LinkedIn URL in `profile.linkedin`
- [ ] Confirm `profile.email` is the address you want public
- [ ] Confirm `profile.name` is how you want your name shown
- [ ] Replace `public/resume.pdf` if you want a different version downloadable (note: anything in `public/` is public on the internet)

Then run `npm run build` once locally. If it succeeds, Netlify's build will too.

You have three ways to deploy. **Option A is what companies do**, and it's the one I recommend you learn.

### Option A — GitHub + Netlify (automatic deploys on every push) ★ Recommended

This gives you a real CI/CD pipeline: push code → Netlify builds → site updates. Same idea as your Azure DevOps pipelines.

**A1. Create a GitHub repo**

1. Sign in at https://github.com (create an account if you don't have one; you'll want it for your GitHub link anyway).
2. Click **+ → New repository**.
3. Name: `portfolio`. Visibility: **Public** (recruiters can see your code) or Private (still works with Netlify).
4. **Don't** tick "Add a README" (you already have one). Click **Create repository**.

**A2. Push your code** — in the VS Code terminal, inside the `portfolio` folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

What each line does:

- `git init` — turn the folder into a Git repository
- `git add .` — stage all files (`.gitignore` keeps `node_modules` and `dist` out)
- `git commit` — save a snapshot
- `git branch -M main` — name the branch `main`
- `git remote add origin …` — tell Git where GitHub lives
- `git push` — upload

If Git asks you to sign in, a browser window will open for GitHub. Refresh the GitHub page and your files should be there.

**A3. Connect Netlify**

1. Go to https://app.netlify.com and **Sign up with GitHub** (one click, and it links the accounts).
2. Click **Add new site → Import an existing project**. (Netlify sometimes renames buttons; look for "import from Git".)
3. Choose **GitHub**, authorize, and pick your `portfolio` repo.
4. Netlify reads `netlify.toml` and pre-fills:
   - Build command: `npm run build`
   - Publish directory: `dist`

   Leave them as they are.
5. Click **Deploy**.

Watch the **Deploys** tab. You'll see the log: installing dependencies, running `vite build`, publishing. It takes about a minute. When it says **Published**, click the URL (something like `random-name-123.netlify.app`).

**A4. Pick a nicer URL**

**Site configuration → Change site name** → e.g. `srinadh-dev`. Your site becomes `https://srinadh-dev.netlify.app`.

### Option B — Drag and drop (fastest, no Git)

1. Run `npm run build` locally.
2. Go to https://app.netlify.com/drop.
3. Drag the **`dist`** folder (not the whole project) onto the page.

It's live in seconds. Downside: no automatic updates; you repeat this every time you change something.

### Option C — Netlify CLI (from your terminal)

```bash
npm install -g netlify-cli
netlify login          # opens browser to authorize
netlify init           # link this folder to a new site
netlify deploy         # draft deploy → gives a preview URL to check
netlify deploy --prod  # publish to your live URL
```

Useful once you're comfortable; it's how you'd script deploys.

### Optional — your own domain

If you buy a domain (e.g. `srinadh.dev`, usually $10–20/year from a registrar; the domain itself is not free), go to **Domain management → Add a domain** in Netlify and follow the DNS steps. Netlify provides the HTTPS certificate for free.

---

## 11. Updating the live site later

With Option A, updating is just:

```bash
# edit src/data.js (e.g. add your GitHub link)
git add .
git commit -m "Add GitHub link"
git push
```

Netlify sees the push and redeploys automatically. If a build fails, Netlify keeps the previous version live, so a mistake never takes your site down.

**Adding your GitHub link** (when you're ready):

```js
// src/data.js
github: 'https://github.com/your-username',
```

The GitHub card appears in the Contact section by itself.

---

## 12. Troubleshooting

| Problem | Fix |
|---|---|
| `npm: command not found` | Node isn't installed or the terminal was open before installing. Install Node 20 LTS, then restart VS Code. |
| `npm install` errors about permissions (Mac) | Don't use `sudo`. Reinstall Node from nodejs.org or use `nvm`. |
| Port 5173 already in use | Another dev server is running. Stop it, or Vite will pick 5174 automatically. |
| 3D area is blank | Your browser has WebGL off or hardware acceleration disabled. The rest of the site still works. Chrome: Settings → System → "Use graphics acceleration". |
| Netlify build fails | Open the deploy log and read the first red error. Run `npm run build` locally; fix whatever fails there and push again. |
| Changes don't show on the live site | Did you `git push`? Check Netlify's Deploys tab. Then hard-refresh: `Ctrl+Shift+R`. |
| Fonts look different | Google Fonts didn't load (network/ad blocker). The site falls back to system fonts. |

---

## 13. Practice exercises

Try these in order. Each one teaches one concept.

1. **Content:** add a new skill to the `AI` group in `data.js`. *(data-driven UI)*
2. **Styling:** change `--accent` to `#f59e0b` (amber) and see the whole site update. *(design tokens)*
3. **Props:** in `Experience.jsx`, change `PREVIEW = 3` to `2`. *(constants and slicing)*
4. **State:** add a "Show all / Collapse all" button above the timeline. *(lifting state up: move `expanded` from `Role` into `Experience`)*
5. **New component:** add a "Certifications" section. Add an array to `data.js`, create `Certifications.jsx` by copying `Education.jsx`, and add it to `App.jsx`. *(the full component workflow)*
6. **3D:** add a third ring in `Scene3D.jsx` with a different tilt and color. *(R3F basics)*
7. **Deploy:** push your change and watch Netlify redeploy. *(CI/CD)*

When you can do exercise 5 without looking at this guide, you can build a site like this from scratch.
