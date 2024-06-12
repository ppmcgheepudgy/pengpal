// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getKnex } from "@/database"

export default async function handler(req, res) {
  const knex = getKnex()
  const { ci_id, id, title, description, url } = req.body

  if (req.method === "PUT") {
    const existImage = await knex("images").where({ id }).first()
    if (existImage) await knex("images").update({ description, title, url }).where({ id })
    else await knex("images").insert({ description, title, url, id })

    return res.json({ success: true, message: "Image details saved." })
  } else if (req.method === "DELETE") {
    console.log(ci_id)
    await knex("category-image").where({ id: ci_id }).delete()
    return res.json({ success: true, message: "Image link deleted" })
  } else if (req.method === "GET") {
    const images = await knex("images").select("*")

    return res.status(200).json({ images })
  }

  return res.status(404).send("")
}
