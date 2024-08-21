# URL Shortener

## Tools

- [TypeScript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/)
  - [Hybrid SSR](https://docs.astro.build/en/basics/rendering-modes/#on-demand-rendered) using it's [Cloudflare integration]
  - [Islands architecture](https://docs.astro.build/en/concepts/islands/)
- [Solid](https://www.solidjs.com/) - Simpler, lightweight and performant interactive components
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Turso](https://turso.tech/) - Replicated SQLite databases, distributed on the Edge.
- [DrizzleORM](https://orm.drizzle.team/) - Simple, lightweight, performant and Edge-compatible ORM
- Deployed on [Cloudflare](https://www.cloudflare.com/developer-platform/products/)
  - [Pages](https://pages.cloudflare.com/) - CDN served static assets (Frontend)
  - [Workers](https://workers.cloudflare.com/) - Serverless functions (Backend)
- [Bun](https://bun.sh/) - For quicker testing (`bun test`) and development package management

## To do / Ideas

- Add documentation
- Check other URL Shortener services for ideas
- Use Cloudflare KV as cache (reduced latency)
- Use Go for Workers/Functions (WASM)
- URL deduplication
  - a URL table with the deduplicated, actual links
  - another table for the URLs a user tracks
- Features
  - Better client errors
  - URL click counter
  - URL tracking panel
- Base requirements
  - Short URL
    - [x] Creation endpoint
    - [x] Creation page
    - [x] Redirection endpoint
