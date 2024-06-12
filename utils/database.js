import { getKnex } from "@/database"

export const getCatImg = async () => {
  const knex = getKnex()
  const categories = await knex("categories as c")
    .select("c.title", "c.id", "ci.img_id as img_id", "ci.id as ci_id", "i.title as img_title", "i.url", "i.description as img_description")
    .leftJoin("category-image as ci", "c.id", "ci.cat_id")
    .leftJoin("images as i", "i.id", "ci.img_id")

  const newCat = categories.reduce((acc, data) => {
    if (acc[data.id]) {
      if (!data.ci_id) return acc
      return {
        ...acc,
        [data.id]: { ...acc[data.id], images: [...acc[data.id].images, { ci_id: data.ci_id, id: data.img_id, title: data.img_title, description: data.img_description, url: data.url }] },
      }
    }

    return {
      ...acc,
      [data.id]: {
        id: data.id,
        title: data.title,
        images: data.ci_id ? [{ ci_id: data.ci_id, id: data.img_id, title: data.img_title, description: data.img_description }] : [],
      },
    }
  }, {})
  return Object.values(newCat)
}
