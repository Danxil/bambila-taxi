/**
 * VehicleController
 *
 * @description :: Server-side logic for managing vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    setVehicle: setVehicle,
    getVehicles: getVehicles,
    destroyVehicle: destroyVehicle,
    updateVehicle: updateVehicle
};


function updateVehicle( req, res ){
    Vehicle
        .update(req.param("vehicle_id"), req.allParams() )
        .exec(function(err, models) {
            if(err) return res.status(404).json({
                "detail":"Not found."
            });

            models[0].VehicleDocument = [];//todo VehicleDocument from DB
            models[0].VehiclePhoto = [];//todo VehiclePhoto from DB

            res.status(200).json(models[0]);
        })
}

function destroyVehicle( req, res ){
    //only for vehicle owner!

    Vehicle
        .destroy({id: req.param("vehicle_id")})
        .exec(function(err, vehicle){
            if(!err && vehicle.length === 1 ){
                res.status(204).end()
            }
            else {
                res.status(404).json({
                    "detail":"Not found."
                })
            }
        });
}

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

            vehicle.VehicleDocument = [];//todo VehicleDocument from DB
            vehicle.VehiclePhoto = [];//todo VehiclePhoto from DB

            return [vehicle];
        })
        .spread(function(vehicle){
            res.status(200).json(vehicle)
        })
        .catch(function(err){
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
