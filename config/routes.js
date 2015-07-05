/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {


  "/": {
    view: "homepage"
  },
  auth: {
    "/signup": {
      controller: "User",
      action: "signup"
    }
  }


};
