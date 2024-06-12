/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */

import knex from "knex"
import knexConfig from "../knexfile"

//@ts-expect-error
let cached = global.pg
//@ts-expect-error
if (!cached) cached = global.pg = {}

export function getKnex() {
  if (!cached.instance) {
    console.log(knexConfig)
    cached.instance = knex(knexConfig)
  }

  return cached.instance
}
