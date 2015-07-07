/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var utils = require("../../utils/utils");
var token = require('hat');

module.exports = {
    signup: function (req, res) {
        var data = req.body;
        if( !utils.isEmptyObject(data) ){
            //generate token

            data.token = token();
            User.create( data )
                .exec( function( err, user ) {
                    if( !err ){
                        return res.status(201).json({
                            email: user.email,
                            phone: user.phone,
                            id: user.id
                        });
                    }
                    else {
                        var attr = err.Errors;//sails-hook-validation
console.log(attr)
                        if ( attr.hasOwnProperty("email") && attr.hasOwnProperty("phone") && attr.hasOwnProperty("password") ){
                            attr = attr.email[0] || attr.phone[0] || attr.password[0] ;
                            if ( attr.rule === 'required' ){
                                return res.status(400).json({
                                    email: [attr.email[0].message],
                                    phone: [attr.email[0].phone],
                                    password: [attr.email[0].password]
                                });
                            }
                        }

                        attr = err.Errors;

                        if ( attr.hasOwnProperty("email") ){
                            attr = attr.email[0];

                            if ( attr.rule === 'unique' ){
                                return res.status(400).json({
                                    detail: attr.message
                                });
                            }
                            else {
                                return res.status(400).json({
                                    email: [attr.message]
                                });
                            }
                        }
                        else if( attr.hasOwnProperty("phone") ){
                            attr = attr.phone[0];

                            if ( attr.rule === 'unique' ){
                                return res.status(400).json({
                                    detail: attr.message
                                });
                            }
                            else {
                                return res.status(400).json({
                                    phone: [attr.message]
                                });
                            }
                        }
                        else if( attr.hasOwnProperty("password") ){
                            attr = attr.password[0];

                            if ( attr.rule === 'required' ){
                                return res.status(400).json({
                                    password: [attr.message]
                                });
                            }
                        }
                    }
                });
        }
        else {
            return res.status(400).json({
                email:    "This field is required.",
                phone:    "This field is required.",
                password: "This field is required."
            });
        }
    },
    login: function (req, res) {
        var data = req.body;
        if( !utils.isEmptyObject(data) ){
            User.find({
                email:"login1",
                password:"login3"
            }).exec(function(err, model){
                    console.error("!!111!!user login", err);
                    console.error("!!111!!user login", result);

                    return res.status(400).json({
                        id: model.id,
                        token: model.token
                    });
                    //return model.toJSON(); // Will return only the name
                });
        }
        else {

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
};

