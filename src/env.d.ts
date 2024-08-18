/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

declare namespace App {
  interface Locals extends Runtime { }
}

interface Env {
  TURSO_URL?: string
  TURSO_AUTH_TOKEN?: string
}

