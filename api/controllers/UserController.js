/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var utils = require("../../utils/utils");
var token = require("hat");
var bcrypt = require("bcrypt");
var async = require("async");
var smtp = require("../services/mailer/smtp");
var isEmptyObject = utils.isEmptyObject;

module.exports = {
    create: function ( req, res ) {
        var data = req.body;

        if ( isEmptyObject(data) ) {//if true === obj empty
            return res.status(400).json({
                email: "This field is required.",
                phone: "This field is required.",
                password: "This field is required."
            });
        }

        var pass = data.password;

        async.waterfall([
            function( callback ) {
                passwordHash( pass, function( err, hash ){
                    data.password = hash;
                    callback( err, data );
                });
            },
            function( data, callback ) {
                User
                    .create( data )
                    .exec( function ( err, user ) {
                        if ( !err && user ) {//ok user created
                            callback( err, user );
                        }
                        else {
                            userCreateValidateMsg( err, function ( err, result ) {
                                callback( res.status(400).json( result ) );
                            });
                        }
                    });
            },
            function( user, callback ) {
                var verificationCode = token() + token() + token();//generate verificationCode

                smtp.sendVerificatinCode( data.email, verificationCode, function( err, info ){
                    callback( err, verificationCode, info );//info not need, only use for log
                });
            },
            function( verificationCode, info, callback ) {
                User.findOne( data )
                    .exec( function( err, model ){
                        callback( err, model, verificationCode );
                    });
            },
            function( model, verificationCode, callback ) {

                data.active = false;//non verified email
                data.code = verificationCode;

                User
                    .update( model.id, data )
                    .exec( function( err, models ) {
                        callback( err, models[0] );
                    });
            }
        ], function ( err, user ) {
            return res.status(201).json( {
                email: user.email,
                phone: user.phone,
                id: user.id
            });
        });
    },
    verify: function( req, res ){
        var code = req.query;

        async.waterfall([
            function( callback ) {
                if( !isEmptyObject( code ) ){//if not empty
                    callback( null, code );
                }
                else {
                    callback({
                        "detail": "Unable to verify user."
                    });
                }
            },
            function( code, callback ) {
                User.findOne( code )
                    .exec( function( err, model ){
                        callback( err, model );
                    });
            },
            function( model, callback) {
                if( model ){
                    callback( null, model );
                }
                else {
                    callback( "model with this verification code not found" );
                }
            },
            function( model, callback) {
                var data = model;
                data.active = true;
                data.code = "verified";

                callback( null, model, data );
            },
            function( model, data, callback) {
                console.log( "model.code1", model.code );
                User
                    .update( code, data )
                    .exec( function( err, models ) {
                        console.log( "err", err );
                        console.log( "model", model );
                        console.log( "model.code2", model.code );
                        console.log( "models", models );
                        console.log( "data",data );
                        callback( err, models );
                    });
            }
        ], function ( err, result ) {
            if( !err){
                res.status( 200).json({
                    "success": "User verified."
                });
            }
            else {
                res.status( 400).json({
                    "detail": "Unable to verify user."
                });
            }
        });
    },
    find: function ( req, res ) {

        var data = req.body;

        if( (!data.hasOwnProperty("email") || data.email === "" )
            && ( !data.hasOwnProperty("password") || data.password === "" ) ){
            return res.status( 400 ).json({
                "email": [
                    "This field is required."
                ],
                "password": [
                    "This field is required."
                ]
            });
        }
        if( !data.hasOwnProperty("email") || data.email === "" ){
            return res.status( 400 ).json({ "email": [
                "This field is required."
            ]});
        }
        if( !data.hasOwnProperty("password") || data.password === "" ){
            return res.status( 400 ).json({ "password": [
                "This field is required."
            ]});
        }

        var pass = data.password;
        delete data.password;

        async.waterfall([
            function( callback ) {
                User.findOne( data )
                    .exec( function( err, model ){
                        if( model ){
                            callback( err, model );
                        }
                        else {
                            callback( err, false );
                        }
                    });
            },
            function( model, callback) {
                passwordCompare( pass, model.password, function( err, compareStatus ) {//pass equal passHache
                    var errMsg = err;
                    callback( null, model, compareStatus, errMsg );
                });
            },
            function( model, compareStatus, errMsg, callback ){
                if ( model && compareStatus && !errMsg ) {
                    data.token = token();

                    User
                        .update( model.id, data )
                        .exec( function( err, models ) {
                            callback( null, {///////200 ok
                                id: models[0].id,
                                token: models[0].token
                            });
                            //callback( null, 200 );
                        });
                }
                else {
                    userFindValidateMsg( errMsg, model, function ( status, result ) {
                        callback( status, result );//////400 || 401
                    });
                }
            }
        ], function ( status, result) {
            if( !status ){
                res.status( 200 ).json( result );//200
            }
            else {
                res.status( status ).json({
                    "detail": "Authentication credentials were not provided."
                });// 400 || 401
            }
        });
    }
};

function passwordHash( pass, callback ){//create hash
    bcrypt.genSalt(10, function( err, salt ) {//todo handle error
        bcrypt.hash( pass, salt, function( err, hash ) {
            callback( err, hash );
        });
    });
}

function passwordCompare( pass, hash, callback ){//compare password
    bcrypt.compare( pass, hash, function( err, status ) {
        callback( err, status );
    });
}

function userFindValidateMsg( err, model, callback ){
    if ( !model ){//un
        callback( 401, {
            "detail": "Authentication credentials were not provided."
        });
    }
    else {
        var attr = err;
        if ( err && err.hasOwnProperty("Errors") ){//sails-hook-validation
            if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("password") ){
                callback( 400, {
                    email: [attr.email[0].message],
                    password: [attr.email[0].password]
                });
            }
            else if ( attr.hasOwnProperty("password") ){
                callback( 400, {
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
                    callback( 400, {
                        email: [attr.message]
                    });
                }
            }
            else if( attr.hasOwnProperty("password") ){
                attr = err.Errors;
                attr = attr.password[0];

                if ( attr.rule === 'required' ){
                    callback( 400, {
                        password: [attr.message]
                    });
                }
            }
        }
        else {
            callback( 401, {
                "detail": "Authentication credentials were not provided."
            });//401
        }
    }
}

function userCreateValidateMsg( err, callback ){
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