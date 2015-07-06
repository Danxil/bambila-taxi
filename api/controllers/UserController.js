/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    signup: function (req, res) {
        User.create( req.body )
            .exec( function( err, user ) {
                if( !err ){
                    console.error("!!111!!user signup", user);
                    return res.status(201).json({
                        email: user.email,
                        phone: user.phone,
                        id: user.id
                    });
                }
                else {
                    var attr = err.Errors;//sails-hook-validation
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
    },
    login: function (req, res) {
        //return res.json({
        //    todo: 'login() is not implemented yet!'
        //});
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

