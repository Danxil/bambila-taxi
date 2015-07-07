/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var utils = require("../../utils/utils");
var token = require('hat');

module.exports = {
    create: function (req, res) {
        var data = req.body;
        if ( utils.isEmptyObject(data) ) {//true === empty
            return res.status(400).json({
                email: "This field is required.",
                phone: "This field is required.",
                password: "This field is required."
            });
        }
        else {
            //generate token
            data.token = token();

            User
                .create( data )
                .exec( function ( err, user ) {
                    if ( !err ) {
                        return res.status( 201 ).json({
                            email: user.email,
                            phone: user.phone,
                            id: user.id
                        });
                    }
                    else {
                        userCreateValidate( err, function ( err, result ) {
                            return res.status(400).json( result );
                        })
                    }
                });
        }
    },
    find: function (req, res) {

        var data = req.body;

        if( !utils.isEmptyObject( data ) ){
            User
                .findOne( data )
                .exec( function( err, model ){

                    if ( !err && model ) {
                        console.error("model", model)
                        res.status( 200 ).json({
                            id: model.id,
                            token: model.token
                        });//200
                    }
                    else {
                        userFindValidate( err, model, function ( status, result ) {
                            if( !status ){
                                return res.status( 400 ).json( result );//400
                            }
                            else {
                                return res.status( status ).json( result );//401
                            }
                        });
                    }
                });
        }
        else {
            return res.status( 400 ).json({
                "password": [
                    "This field is required."
                ],
                "email": [
                    "This field is required."
                ]
            });//400
        }
    }
};

function userFindValidate( err, model, callback ){


    if ( !model ){//un
        console.log("userFindValidate err", model);
        callback( 401, {
            "detail": "Authentication credentials were not provided."
        });
    }
    else {

        var attr = err.Errors;//sails-hook-validation
        console.log("userFindValidate", attr);


        if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("password") ){
            callback( null, {
                email: [attr.email[0].message],
                password: [attr.email[0].password]
            });
        }
        else if ( attr.hasOwnProperty("password") ){
            callback( null, {
                password: [attr.password[0].password]
            });
        }
        else if ( attr.hasOwnProperty("email") ){
            attr = err.Errors;
            attr = attr.email[0];

            if ( attr.rule === 'unique' ){
                callback( 401, {
                    detail: attr.message
                });
            }
            else {
                callback( null, {
                    email: [attr.message]
                });
            }
        }
        else if( attr.hasOwnProperty("password") ){
            attr = err.Errors;
            attr = attr.password[0];

            if ( attr.rule === 'required' ){
                callback( null, {
                    password: [attr.message]
                });
            }
        }
    }
}

function userCreateValidate( err, callback ){
    var attr = err.Errors;//sails-hook-validation
    if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("phone") && attr.hasOwnProperty("password") ){
        callback( null, {
            email: [attr.email[0].message],
            phone: [attr.email[0].phone],
            password: [attr.email[0].password]
        });
    }
    else if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("phone") ){
        callback( null, {
            email: [attr.email[0].message],
            phone: [attr.email[0].phone]
        });
    }
    else if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("password") ){
        callback( null, {
            email: [attr.email[0].message],
            password: [attr.email[0].password]
        });
    }
    else if (  attr.hasOwnProperty("phone") && attr.hasOwnProperty("password") ){
        callback( null, {
            phone: [attr.phone[0].phone],
            password: [attr.phone[0].password]
        });
    }
    else if ( attr.hasOwnProperty("email") ){
        attr = err.Errors;
        attr = attr.email[0];

        if ( attr.rule === 'unique' ){
            callback( null, {
                detail: attr.message
            });
        }
        else {
            callback( null, {
                email: [attr.message]
            });
        }
    }
    else if( attr.hasOwnProperty("phone") ){
        attr = err.Errors;
        attr = attr.phone[0];

        if ( attr.rule === 'unique' ){
            callback( null, {
                detail: attr.message
            });
        }
        else {
            callback( null, {
                phone: [attr.message]
            });
        }
    }
    else if( attr.hasOwnProperty("password") ){
        attr = err.Errors;
        attr = attr.password[0];

        if ( attr.rule === 'required' ){
            callback( null, {
                password: [attr.message]
            });
        }
    }
}


//create: function (req, res) {
//    User.create(req.body).exec(function(err, user) {
//        console.error("efg444", err)
//        console.error("efg444", user)
//        res.end(JSON.stringify(user));
//    });
//},
//
//destroy: function(req, res) {
//    User.destroy(req.body).done(function(err) {
//        if(err) {
//            res.end("Error: "+err);
//        } else {
//            res.end("User destroyed.");
//        }
//    });
//},
//
//index: function(req, res) {
//    console.log("Looking for index.ejs");
//    User.find(function(err, users) {
//        console.log(JSON.stringify(users));
//        res.view({
//            users: users
//        });
//    });
//}