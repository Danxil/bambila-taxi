/**
 * VehicleController
 *
 * @description :: Server-side logic for managing vehicles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var DP = require("../../../utils/directoryPartition");

module.exports = {
    setVehicle: setVehicle,
    getVehicles: getVehicles,
    destroyVehicle: destroyVehicle,
    updateVehicle: updateVehicle,
    setFile: setFile
};


function setFile( req, res ){
    //photo, vehicle
    //document, vehicle

    var type = req.url.split("/")[5];//photo or document

    async.waterfall([
        function( callback ) {
            req.file('image').upload( callback );
        },
        function( files, callback) {
            for ( var i = 0; i < files.length; i++ ){//images count
                DP.createInMediaDirectory( type, files, i, callback );//return oldName, newName
            }
        },
        function( oldName, newName, callback ) {
            fs.rename( oldName, newName, function( err ){//move image to new path
                callback( err, newName );
            });
        },
        function( newName, callback ) {
            if( type === "photo" ){
                VehiclePhoto
                    .create( {
                        image: newName,
                        vehicle: req.param("vehicle")
                    })
                    .exec( callback );
            }
            else if( type === "document" ){
                VehicleDocument
                .create( {
                    image: newName,
                    vehicle: req.param("vehicle")
                })
                .exec( callback );
            }
            else {
                callback("undefined type");
            }
        }
    ], function ( err, photo ) {
        if( !err ){
            res.status(200).json(photo)
        }
        else {
            res.status(500).json(photo)
        }
    });
}

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
