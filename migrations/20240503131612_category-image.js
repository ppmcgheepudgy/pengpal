/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("category-image", t => {
    t.increments()
    t.integer("cat_id").references("categories.id").onDelete("CASCADE").notNullable()
    t.integer("img_id").notNullable() //.references("images.id").onDelete("CASCADE")
    t.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("category-image")
}
