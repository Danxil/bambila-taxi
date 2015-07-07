/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  "post /api/signup": {
    controller: "User",
    action: "signup"
  },
  "post /api/login": {
    controller: "User",
    action: "login"
  }
};
