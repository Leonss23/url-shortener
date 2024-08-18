import type { APIRoute } from "astro"
import { eq } from "drizzle-orm"
import { decode } from "../../api/base62"
import { attempt } from "../../api/utils"
import { dbConnect } from "../../db"
import { urls } from "../../db/schema"

export const prerender = false

export const GET: APIRoute = async ({ redirect, rewrite, locals: { runtime: { env } }, params: { shortUrl } }) => {

  if (shortUrl == undefined) return rewrite("/404");

  const id = decode(shortUrl)

  const db = dbConnect(env)

  const { result, error } = await attempt(() => db.query.urls.findFirst({ columns: { url: true }, where: eq(urls.id, id) }))

  if (error) {
    console.error(error);
    return rewrite("/500");
  }

  if (!result) return rewrite("/404");

  const { url } = result

  return redirect(url, 303)
}

