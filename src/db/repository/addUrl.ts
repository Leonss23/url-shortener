import type { DB } from "..";
import { ApiError } from "../../lib/ApiError";
import { urls } from "../schema";

export default async function addUrl(db: DB, url: string) {
  const id = await db
    .insert(urls)
    .values({ url })
    .onConflictDoUpdate({ target: urls.url, set: { url: url } })
    .returning({ id: urls.id })
    .then((v) => v[0].id)
    .catch(async (error) => {
      if (!(error instanceof Error)) return ApiError.internal();

      // SERVER ERROR HANDLING
      console.error(error);
      if (error.message.includes("401"))
        return new ApiError(
          503,
          "Service Unavailable. Database interaction failed",
        );
      return ApiError.internal();
    });
  if (id instanceof ApiError) return id;

  return id;
}
