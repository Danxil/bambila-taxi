/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'vehicles',
    schema: true,

    attributes: {
    	user: {
    		model: 'user'
    	},
        vehicle_type: "String",
        brand: "String",
        model: "String",
        regNumber: "Number",
        regDate: "Date",
		seats: "Number",
        VehiclePhotos: {
        	collection: 'VehiclePhoto',
            via: 'vehicle' 
        },
        VehicleDocuments: {
        	collection: 'vehicleDocument',
            via: 'vehicle' 
        }
    }
};
