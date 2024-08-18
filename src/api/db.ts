import { createClient } from "@libsql/client/web";

export function dbConnect(env: Env) {
  const url = env.TURSO_URL?.trim();
  if (url == undefined) throw new Error("TURSO_URL env var is not defined");

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken == undefined) throw new Error("TURSO_AUTH_TOKEN env var is not defined");

  return createClient({ url, authToken })
}
