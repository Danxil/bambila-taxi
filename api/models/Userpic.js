/**
* Userpics.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'userpics',
  schema: true,

  attributes: {
  	image: {
  		type: 'String',
  		required: true
  	},
  	user: {
  		model: 'user',
  	},
  	category: {
  		type: 'String'
  	}
  }
};

