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
        },
        token: {//session on login
            type: 'string',
            unique: true,
            required: false//after login generate token
        },
        code: {//verification email code
            type: 'string',
            unique: true
            //required: true
        },
        active: {//user status, status == active -> after verification email
            type: 'boolean',
            required: false
        }
    },
    validationMessages: { //hand for i18n & l10n
        email: {
            email: "Enter a valid email address.",
            required: "This field is required.",
            unique: "User with this Email address already exists."
        },
        password: {
            required: "This field is required."
        },
        phone: {
            required: "This field is required.",
            //phone : "This value does not match the required pattern.",//todo regexp pattern tel.
            unique: "User with this phone number already exists."
        },
        token: {
            unique: "User with this Token already exists."
        },
        code: {
            required: "This field is required.",
            unique: "User with this Code address already exists."
        }
    }
};

