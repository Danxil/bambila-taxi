/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  "/": {
    view: "homepage"
  },
  "post /api/signup": {
    controller: "User",
    action: "create"
  },
  "get /api/signup/verify": {
    controller: "User",
    action: "verify"
  },
  "post /api/login": {
    controller: "User",
    action: "login"
  },
  "get /api/users": { // for testing
    controller: "User",
    action: "findAll"
  },
  "get /api/users/me": {
    controller: "User",
    action: "getYourself"
  }
};
