// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: "postgres-dev",
      database: 'crypto_store_dev',
      user: "mbq_dev_user",
      password: "mFl4g5Bx~40|C1w",
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
      database: 'mbqqa',
      user:     'mbq_dev_user',
      password: 'mFl4g5Bx~40|C1w',
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
      database: 'mbqprod',
      user:     'mbq_dev_user',
      password: 'mFl4g5Bx~40|C1w',
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
