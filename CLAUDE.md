# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:4321
npm run build     # production build → dist/
npm run preview   # serve the dist/ build locally
```

No linter or test runner is configured. TypeScript is checked implicitly during `astro build` (strict mode, via `astro/tsconfigs/strict`).

## Architecture

**Astro 4 + React 18 static site.** One page (`src/pages/index.astro`). Everything outside the four React islands ships as zero-JS HTML/CSS.

### Rendering split

| Location | Hydration | When to use |
|---|---|---|
| `src/components/astro/` | None — server-rendered HTML only | Static content (About, Skills, Education, Resume, Contact) |
| `src/components/react/` | `client:load` / `client:visible` / `client:idle` | Anything with `useState`/`useEffect` |

The four React islands and their hydration strategy:
- `TypewriterHero` — `client:load` (visible immediately)
- `ExperienceTimeline` — `client:visible` (below the fold, expand/collapse interaction)
- `ProjectsGrid` — `client:visible` (below the fold, expand/collapse interaction)
- `CustomCursor` — `client:idle` (renders nothing; pure side-effect)

### Data flow

Content collections (`src/content/config.ts`) define Zod-validated schemas for `experience`, `projects`, and `education`. `src/pages/index.astro` reads them with `getCollection()`, sorts by `order`, strips to plain data objects (`.map(e => e.data)`), and passes them as props to the React islands. Props must be JSON-serializable — no `Date` objects, no content collection `Entry` shapes.

To add a job: create a new `.md` in `src/content/experience/` with the correct frontmatter fields (`order`, `years`, `role`, `company`, `location`, `summary`, `details[]`, `stack[]`). Build will fail if required fields are missing.

### CSS organization

All styles are imported once in `src/layouts/TerminalFrame.astro`. Files are split by concern:

| File | Covers |
|---|---|
| `tokens.css` | `:root` variables, dark theme vars, density modifiers |
| `terminal-frame.css` | `.layout-terminal`, `.tm-*` (titlebar, sidebar, main, statusbar, hero, buttons) |
| `section.css` | `.section`, `.section-head`, `.section-title`, `.pill-outline-sm` |
| `timeline.css` | `.tl-*`, `.chip-stack` |
| `projects.css` | `.project-card`, `.pc-*` |
| `about.css` / `skills.css` / `education.css` / `resume.css` / `contact.css` | section-specific styles |

**Key tokens:** `--accent-a: #9e293a` (red), `--accent-b: #624870` (purple). Section titles alternate these via `data-accent="a"|"b"`. The `>` glyph on each title is a CSS `::before` on `.tm-main .section-title`.

**Terminal-context overrides:** `.tm-main .foo` rules in `terminal-frame.css` override base colors for cards, chips, text colors inside the dark IDE pane. If a component looks wrong inside the terminal frame, check there first.

### Layout chrome

`TerminalFrame.astro` owns the full HTML shell: `<head>` (fonts, CSS), custom cursor divs, `.layout-terminal` wrapper (titlebar → body grid → statusbar), and the sidebar file-tree nav. The sidebar's `active` class is driven by an inline `<script>` using `IntersectionObserver` with `rootMargin: '-40% 0px -50% 0px'`.

The statusbar is `position: fixed; bottom: 0` so it's always visible. The sidebar is `position: sticky; top: 40px` (below the sticky titlebar).

### Content gitignore

`src/content/{experience,projects,education,profile,social,skills}/` are gitignored — personal data stays off public repos. `src/content/config.ts` (the schemas) **is** tracked.

### Static content (Skills, About, Resume, Contact)

About, Skills, Resume, and Contact pull personal data from `getEntry('profile'|'social'|'skills', 'me')` (singleton data collections in `src/content/`). Edit the JSON file in the matching folder to update; schema is enforced at build time by `src/content/config.ts`.

## Conventions

### Pick the right component type
- Default to `.astro` (ships zero JS). Reach for React only when you need `useState` / `useEffect` / `useRef`.
- If a section is mostly static with one interactive bit, render the static parts in `.astro` and put only the interactive subtree in a `.tsx` island.

### CSS
- Use tokens (`var(--fg)`, `var(--accent-a)`, `var(--line)`). No hex literals in component styles. New colors → add a token in `tokens.css` first.
- New section styles → new file in `src/styles/`, then add the import line to `TerminalFrame.astro`. No inline `<style>` tags in components.
- Dark/IDE-pane overrides go in `terminal-frame.css` under a `.tm-main .foo` selector — not in the section's own CSS file.
- Class prefixes are intentional: `.tm-*` (terminal), `.tl-*` (timeline), `.pc-*` (project card), `.rs-*` (resume), `.edu-*` (education), `.sg-*` (skill group). Extend the existing prefix; don't invent new ones.

### React islands
- Typed `Props` interface for every component. No untyped destructuring.
- Props must be JSON-serializable. Don't pass `Date`, `Map`, content collection `Entry` objects, or functions across the island boundary.
- Every `useEffect` returns a cleanup that removes listeners, cancels `requestAnimationFrame`, clears timeouts. `CustomCursor.tsx` is the reference pattern.
- No `window.*` globals. The prototype set `window.Foo = Foo`; we removed it. Pass data via props or imports.

### Adding content
- New job / project / education entry → copy an existing `.md` in the matching folder, bump `order`, edit fields. Schema in `config.ts` enforces shape at build time.
- New collection → add a `defineCollection` block in `config.ts`, gitignore the folder, scaffold one example file.
- Skills / About / Resume / Contact data lives in `src/content/{skills,profile,social}/me.json` — edit the JSON, not the component.

### Accessibility
- Real `<button>` for click targets, real `<a href>` for navigation. No `<div onClick>`.
- `aria-expanded` on disclosure buttons (timeline rows), `aria-label` on icon-only links (social icons), `aria-hidden` on decorative SVGs and the cursor divs.

### Don't
- Don't pull in a CSS framework. Deliberate decision; plain CSS keeps the bundle small and the styles legible.
- Don't extract `<Pill>` / `<Chip>` into standalone components unless they're used in 4+ places with varying props. Current inline markup reads better.
- Don't resurrect the tweaks panel or theme switcher — they were design-time scaffolding.
- Don't comment what the code already says. Existing comments explain *why* (e.g., the cursor's exponential smoothing). Match that bar.
