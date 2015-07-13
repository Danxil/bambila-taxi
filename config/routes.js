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
  "get /api/logout": {
    controller: "User",
    action: "logout"
  },
  "get /api/users": { // for testing
    controller: "User",
    action: "findAll"
  },
  "get /api/users/me": {
    controller: "User",
    action: "getYourself"
  },
  "patch /api/users/me": {
    controller: "User",
    action: "patchYourself"
  },
  "get /api/users/ver": {
    controller: "User",
    action: "getVerificationData"
  }
};
