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
  "post /api/login": {
    controller: "User",
    action: "find"
  }
};
