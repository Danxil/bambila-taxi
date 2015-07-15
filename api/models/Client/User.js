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
            type: 'String',
            unique: true,
            required: true
        },
        password: {
            type: 'String',
            required: true
        },
        token: {//session on login
            type: 'String',
            unique: true
        },
        code: {//verification email code
            type: 'String',
            unique: true
        },
        active: {//user status, status == active -> after verification email
            type: 'boolean'
        },
        // not required parameters
        first_name: {
            type: 'String'
        },
        middle_name: {
            type: 'String'
        },
        last_name: {
            type: 'String'
        },
        address1: {
            type: 'String'
        },
        address2: {
            type: 'String'
        },
        mobile2: {
            type: 'String'
        },
        city: {
            type: 'String'
        },
        postCode: {
            type: 'Integer'
        },
        country: {
            type: 'String'
        },
        driver_rating: {
            type: 'Integer'
        },
        client_rating: {
            type: 'Integer'
        },
        user_pictures: {
            collection: 'userpic',
            via: 'user' 
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.token;
            delete obj.code;
            return obj;
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
            unique: "User with this phone Integer already exists."
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

