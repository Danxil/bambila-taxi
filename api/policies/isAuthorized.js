// var UserController = require("../controllers/UserController.js");

module.exports = function (req, res, next) {
  var token;
 
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];
 
      if (/^Token$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Token [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {detail: 'No Authorization header was found.'});
  }
 
  console.log("User model", User);

  User.findOne({token: token}, function (err, data) {
    if (err)  return res.send(err); // Write global error handler
    if(!data) return res.json(401, {detail: 'Invalid Token'});

    req.user = data;
    next();
  });

};