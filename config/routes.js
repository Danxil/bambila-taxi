/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {


  "/": {
    view: "homepage"
  },

  "get /signup": {
    controller: "User",
    action: "signup"
  },
  "post /signup": {
    controller: "User",
    action: "signup"
  }



};
