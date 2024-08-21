import { eq } from "drizzle-orm"
import type { DB } from ".."
import { urls } from "../schema"
import { ApiError } from "../../lib/ApiError"

export default async function getIdByUrl(db: DB, url: string) {
  const result = await db.query.urls.findFirst({ columns: { id: true }, where: eq(urls.url, url) }).catch((error) => {

    console.error(error)
    return ApiError.internal()
  })
  if (result instanceof ApiError) return result

  if (!result) return new ApiError(404, 'URL not found')

  return result.id
}
