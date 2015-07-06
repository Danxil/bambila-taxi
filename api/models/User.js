var bcrypt = require("bcrypt");
module.exports = {
    adapter: 'node_rideshare',
    tableName: 'users',
    schema: true,
    attributes: {
        email: {
            type: 'email',
            minLength: 6,
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        phone: {
            type: 'string',
            unique: true,
            required: true
        }
    }
};

