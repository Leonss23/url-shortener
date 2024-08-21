import { eq } from "drizzle-orm";
import { urls } from "../schema";
import type { DB } from "..";
import { LibsqlError } from "@libsql/client";
import { ApiError } from "../../lib/ApiError";

export default async function getUrlById(db: DB, id: number): Promise<string | ApiError> {
  const result = await db.query.urls.findFirst({ columns: { url: true }, where: eq(urls.id, id) }).catch((error) => {
    if (error instanceof LibsqlError && error.message.includes("401")) return new ApiError(503, 'Service Unavailable. Database interaction failed')

    console.error(error)
    return ApiError.internal()
  })
  if (result instanceof ApiError) return result

  if (!result) return new ApiError(404, 'URL not found')

  return result.url
}
