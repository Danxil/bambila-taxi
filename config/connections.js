module.exports.connections = {

    rest: {
        adapter: 'sails-rest',
        host:     'localhost:1337',  // api host
        protocol: 'http',            // api HTTP protocol
        pathname: '',                 // api endpoint path name
        headers:  {},                // Optional HTTP headers
        hooks: {
            merge:    true,            // flag that indicates whether or not to merge build-in hooks with user-provided hooks
            before:   [],              // array of hook functions that run before a request
            after:    []               // array of hook functions that run after a request
        }
    },

    node_rideshare: {
        adapter: 'sails-postgresql',
        host: 'bambilla.club',
        user: 'rideshare',
        database: 'node_rideshare',
        password: 'sD4oFYeyWxF0zMj8Vmr2HtOA'
    },

    localDiskDb: {
        adapter: 'sails-disk'
    }
    //someMysqlServer: {
    //  adapter: 'sails-mysql',
    //  host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    //  user: 'YOUR_MYSQL_USER',
    //  password: 'YOUR_MYSQL_PASSWORD',
    //  database: 'YOUR_MYSQL_DB'
    //},
    //
    //someMongodbServer: {
    //  adapter: 'sails-mongo',
    //  host: 'localhost',
    //  port: 27017,
    //  // user: 'username',
    //  // password: 'password',
    //  // database: 'your_mongo_db_name_here'
    //}
};
