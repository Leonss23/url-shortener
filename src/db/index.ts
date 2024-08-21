import { createClient } from "@libsql/client/web";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema"

export type DB = LibSQLDatabase<typeof schema>

let db: DB

export function dbConnect(env: Env) {
  if (db) return db

  const url = env.TURSO_URL?.trim();
  if (url == undefined) throw new Error("TURSO_URL env var is not defined");
  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken == undefined) throw new Error("TURSO_AUTH_TOKEN env var is not defined");

  const client = createClient({ url, authToken })
  db = drizzle(client, { schema })

  return db
}

