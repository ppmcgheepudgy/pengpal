// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getKnex } from "@/database"
import { getCatImg } from "@/utils/database"

export default async function handler(req, res) {
  console.log(req.body)
  const { title, images, id } = req.body
  const knex = getKnex()

  if (req.method === "POST") {
    // const ids = images.split(",")
    // const [cat_id] =
    await knex("categories").insert({ title })

    // await knex("category-image").insert(ids.map(img_id => ({ img_id, cat_id })))

    return res.json({ success: true, message: "Category saved" })
  } else if (req.method === "PUT") {
    const ids = images.split(",")

    await knex("category-image").insert(ids.map(img_id => ({ img_id, cat_id: req.body.cat_id })))
    return res.json({ success: true, message: "New image linked to this category" })
  } else if (req.method === "DELETE") {
    await knex("categories").where({ id }).delete()
    return res.json({ success: true, message: "Category deleted" })
  }

  res.status(200).json({ categories: await getCatImg() })
}
