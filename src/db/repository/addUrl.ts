import type { DB } from "..";
import { ApiError } from "../../lib/ApiError";
import { urls } from "../schema";
import getIdByUrl from "./getIdByUrl";

export default async function addUrl(db: DB, url: string) {
  const id = await db
    .insert(urls)
    .values({ url })
    .returning({ id: urls.id })
    .then((v) => v[0].id)
    .catch(async (error) => {
      if (!(error instanceof Error)) return ApiError.internal();

      // USER ERROR HANDLING
      if (error.message.includes("UNIQUE")) {
        const id = await getIdByUrl(db, url);
        if (id instanceof ApiError)
          return new ApiError(
            409,
            "URL is already registered; Failed to get short URL",
          );
        return id;
      }

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
