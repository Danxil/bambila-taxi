module.exports.connections = {

  rest: {
    adapter: 'sails-rest',
    host:     'localhost:8080',  // api host
    protocol: 'http',            // api HTTP protocol
    pathname: '',                 // api endpoint path name
    headers:  {},                // Optional HTTP headers
    hooks: {
      merge:    true,            // flag that indicates whether or not to merge build-in hooks with user-provided hooks
      before:   [],              // array of hook functions that run before a request
      after:    []               // array of hook functions that run after a request
    }
  },

  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_POSTGRES_USER',
    password: 'YOUR_POSTGRES_PASSWORD',
    database: 'YOUR_POSTGRES_DB'
  },

  localDiskDb: {
    adapter: 'sails-disk'
  },
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  }
};
