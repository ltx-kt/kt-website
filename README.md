# kt-website

IDE-themed developer portfolio for Kevin Tran — built with Astro 4 + React 18. Ships as a static site with zero JS outside four interactive islands.

![Portfolio screenshot](public/screenshot.png)

[![Astro](https://img.shields.io/badge/Astro-4-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**Live:** <!-- https://your-domain.com -->

## Stack

- **Framework:** Astro 4 (static output)
- **Islands:** React 18 (`TypewriterHero`, `ExperienceTimeline`, `ProjectsGrid`, `CustomCursor`)
- **Styling:** Plain CSS with design tokens — no CSS framework
- **Content:** Astro content collections with Zod-validated schemas
- **Deploy:** Vercel

## Commands

```bash
npm run dev      # dev server → http://localhost:4321
npm run build    # production build → dist/
npm run preview  # serve the dist/ build locally
```

## Content

Personal content (`src/content/{experience,projects,education,profile,social,skills}/`) is gitignored — real data stays off the public repo. The collection schemas live in `src/content/config.ts` and are tracked.

To scaffold your own content, copy the frontmatter shape from `src/content/config.ts` and drop `.md` / `.json` files into the matching folder.
