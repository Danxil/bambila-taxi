/**
 * VehicleController
 *
 * @description :: Server-side logic for managing vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    setVehicle: setVehicle,
    getVehicles: getVehicles
};

function setVehicle( req, res ) {

    Vehicle
        .create(req.allParams())
        .then(function(vehicle){
            //var documents = VehicleDocument
            //    .find({vehicle: vehicle.id})
            //    .then(function(_documents){
            //        console.log("_documents", _documents)
            //
            //        vehicle.VehicleDocument = _documents;
            //
            //        return vehicle;
            //    });
            //var photos = VehiclePhoto
            //    .find({vehicle: vehicle.id})
            //    .then(function(_photos){
            //        console.log("_photos", _photos)
            //
            //        vehicle.VehiclePhoto = _photos;
            //
            //        return vehicle;
            //    });
            //console.log("documents", documents)
            //console.log("photos", photos)

            vehicle.VehicleDocument = [];
            vehicle.VehiclePhoto = [];

            delete vehicle.updatedAt;
            delete vehicle.createdAt;

            return [vehicle];
        })
        .spread(function(vehicle){
            console.log("vehicle", vehicle)

            res.status(200).json(vehicle)
        })
        .catch(function(err){
            console.error(err);
            res.status(400).json({err:err.message})
        });
}
function getVehicles(req, res) {

    var id = ((req.params.id == "me" || !req.params.id)
        ? req.user.id : req.params.id);

    Vehicle
        .find({user: id})
        .populate("VehiclePhotos")
        .populate("VehicleDocuments")
        .exec(function(err, data) {
            if(err) return res.json(500, err.message);
            res.send(data);
        });
}