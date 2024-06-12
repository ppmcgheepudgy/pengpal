const path = require("path")
/**
 * @type { Object.<string, import("knex").Knex.Config> }

 */
module.exports = {
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: path.resolve(process.cwd() + "/database/mydb.sqlite"),
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
  pool: { afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) },
  debug: true, //dev,
}

console.log(path.resolve(process.cwd() + "/database/mydb.sqlite"))
