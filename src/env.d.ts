/// <reference path="../.astro/types.d.ts" />

import type { Runtime } from "@astrojs/cloudflare";
import type { D1Database } from "@cloudflare/workers-types";

declare namespace App {
  interface Locals extends Runtime<Env> {}
}

interface Env {
  TURSO_URL?: string;
  TURSO_AUTH_TOKEN?: string;
  D1: D1Database;
}
