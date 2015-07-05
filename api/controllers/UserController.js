/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  signup: function (req, res, next) {
    console.error("required", req);
    //email (required)
    //password (required)
    //phone (required)
    return res.json({
      todo: 'signup() is not implemented yet!'
    });
  }
};

