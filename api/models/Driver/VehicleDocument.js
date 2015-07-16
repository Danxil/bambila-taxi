/**
* VehicleDocument.js
*
* @description :: User pictures
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'vehicle_documents',
  schema: true,

  attributes: {
  	image: {
  		type: 'String',
  		required: true
  	},
  	vehicle: {
  		model: 'vehicle'
  	}
  }
};

