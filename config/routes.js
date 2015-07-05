/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {


  "/": {
    view: "homepage"
  },

  "/signup": {
    controller: "User",
    action: "signup"
  }



};
