# URL Shortener

## Tools

- [TypeScript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/)
  - [Hybrid SSR](https://docs.astro.build/en/basics/rendering-modes/#on-demand-rendered) using it's [Cloudflare integration]
  - [Interactive islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Solid](https://www.solidjs.com/) - Simpler, lightweight and performant interactive components
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Bun](https://bun.sh/) - For quicker testing (`bun test`) and development package management
- [Turso](https://turso.tech/) - Replicated, Edge SQLite databases.
- [DrizzleORM](https://orm.drizzle.team/) - Simple, lightweight, performant and Edge-compatible ORM
- [Cloudflare](https://www.cloudflare.com/developer-platform/products/) - For deployment
  - [Pages](https://pages.cloudflare.com/) - CDN served static assets (Frontend)
  - [Workers](https://workers.cloudflare.com/) - Serverless functions (Backend)

## To do / Ideas

- Add documentation
- Bugs/Features
  - Data fetching
    - Loading state
    - Data race (when submitting many different URLs simultaneously)
      - TanStack Query is a possible solution
      - also check SolidJS built-in fetching mechanisms
  - Improve result display using toasts (notification card)
  - URL click counter
  - URL tracking panel
    - a URL table with the deduplicated, actual links
    - another table for the URLs a user tracks
- Workflow
  - CI/CD ([GitHub Actions](https://github.com/features/actions))
  - UI Component Testing ([Storybook](https://storybook.js.org/))
  - Consider E2E Testing ([Playwright](https://playwright.dev/))
  - Consider Mocking (e.g. DB interactions)
  - [x] `base62` testing
- Performance
  - Use Go for Workers/Functions (WASM)
  - [x] Consider Cloudflare D1 instead of Turso (discarded: worse geographical availability)
- Base requirements
  - Short URL
    - [x] Creation endpoint
    - [x] Creation page
    - [x] Redirection endpoint
- Check other URL Shortener services for ideas
