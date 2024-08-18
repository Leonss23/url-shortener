import type { APIRoute } from "astro"
import { dbConnect } from "../../api/db"
import { decode } from "../../api/base62"

export const prerender = false

export const GET: APIRoute = async ({ locals: { runtime: { env } }, request, params: { shortUrl } }) => {
  const db = dbConnect(env)

  if (shortUrl == undefined)
    return new Response("no shortUrl, redirection failed", {
      status: 400
    })

  const id = decode(shortUrl)

  const res = await db.execute({
    sql: "SELECT url FROM urls WHERE id = ?",
    args: [id]
  })

  const url = res.rows[0][1]
  if (url == undefined) {
    return new Response("URL doesn't exist.", {
      status: 404,
    })
  }


  console.log({ url })
  return new Response(null, {
    status: 303,
    headers: {
      'Location': url.toString(),
    }
  })

}

