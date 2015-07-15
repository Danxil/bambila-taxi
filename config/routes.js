/**http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  "/": {
    view: "homepage"
  },
  "post /api/signup": {
    controller: "Client/User",
    action: "create"
  },
  "get /api/signup/verify": {
    controller: "Client/User",
    action: "verify"
  },
  "post /api/login": {
    controller: "Client/User",
    action: "login"
  },
  "get /api/logout": {
    controller: "Client/User",
    action: "logout"
  },
  "get /api/users": { // for testing
    controller: "Client/User",
    action: "findAll"
  },
  "get /api/users/me": {
    controller: "Client/User",
    action: "getYourself"
  },
  "patch /api/users/me": {
    controller: "Client/User",
    action: "patchYourself"
  },
  "get /api/users/ver": {
    controller: "Client/User",
    action: "getVerificationData"
  },
  "get /api/users/:id/vehicle_list": {
    controller: "Driver/Vehicle",
    action: "getVehicles"
  },
  "get /api/users/vehicles": {
    controller: "Driver/Vehicle",
    action: "getVehicles"
  },
  "post /api/users/vehicles": {
    controller: "Driver/Vehicle",
    action: "setVehicle"
  },
  "delete /api/users/vehicles/:vehicle_id": {
    controller: "Driver/Vehicle",
    action: "destroyVehicle"
  },
  "patch /api/users/vehicles/:vehicle_id": {
    controller: "Driver/Vehicle",
    action: "updateVehicle"
  },
  "get /api/users/me/info": {
    controller: "Client/User",
    action: "getInfo"
  },
  "patch /api/users/me/info": {
    controller: "Client/User",
    action: "patchInfo"
  },
  "post /api/users/me/info": {
    controller: "Client/User",
    action: "patchInfo"
  }
};
