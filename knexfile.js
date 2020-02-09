// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "postgres-dev",
      database: 'crypto_store',
      user: "postgres",
      password: "admin123",
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: "postgres-dev",
      database: 'crypto_store_test',
      user:     'postgres',
      password: 'admin123',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: "postgres-dev",
      database: 'crypto_store',
      user:     'postgres',
      password: 'admin123',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
