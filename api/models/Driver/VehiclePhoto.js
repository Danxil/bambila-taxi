/**
* VehiclePhoto.js
*
* @description :: User pictures
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'vehicle_photos',
  schema: true,

  attributes: {
  	image: {
  		type: 'String',//url
  		required: true
  	},
  	vehicle: {
  		model: 'vehicle'
  	}
  }
};

