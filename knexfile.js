// Update with your config settings.

const sharedConfig = {
  client: 'sqlite3',
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    }
  }
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: {
      filename: './data/users.db3'
    }
  },

  testing: {
    ...sharedConfig,
    connection: {
      filename: './data/test.db3'
    },
  }
};
