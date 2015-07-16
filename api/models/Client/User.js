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

        // not required parameters
        token: {//session on login//todo token implement to REDIS DB
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
        first_name: 'String',
        middle_name: 'String',
        last_name: 'String',
        address1: 'String',
        address2: 'String',
        mobile2: 'String',
        city: 'String',
        postCode: 'Integer',
        country: 'String',
        driver_rating: 'Integer',
        client_rating: 'Integer',

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

