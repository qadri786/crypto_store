const dbConfig = require("../config/database");
const logCat = require("../library/logger")("sql");
const knex = require('knex')
module.exports = knex({
    debug: process.env.NODE_ENV == "production" ? false : true,
    client: dbConfig[process.env.NODE_ENV].dialect,
    connection: {
      host : dbConfig[process.env.NODE_ENV].host,
      user : dbConfig[process.env.NODE_ENV].username,
      password : dbConfig[process.env.NODE_ENV].password,
      database : dbConfig[process.env.NODE_ENV].database
    },
    log: {
        warn(message) {
          logCat(`warn: ${JSON.stringify(message)}`);
        },
        error(message) {
          logCat(`error: ${JSON.stringify(message)}`);
        },
        deprecate(message) {
          logCat(`deprecate: ${JSON.stringify(message)}`);
        },
        debug(message) {
          logCat(`debug: ${JSON.stringify(message)}`);
        }
    }
});