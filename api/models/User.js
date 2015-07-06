var bcrypt = require("bcrypt");
module.exports = {
    adapter: 'node_rideshare',
    tableName: 'users',
    schema: true,
    attributes: {
        email: {
            type: 'email',
            unique: true,
            required: true
        },
        phone: {
            type: 'string',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    validationMessages: { //hand for i18n & l10n
        email: {
            email: "Enter a valid email address.",
            required: "This field is required.",
            unique: "User with this Email address already exists."
        },
        phone: {
            required: "This field is required.",
            //telephone : "This value does not match the required pattern.",
            unique: "User with this phone number already exists."
        },
        password: {
            required: "This field is required."
        }
    }
};

