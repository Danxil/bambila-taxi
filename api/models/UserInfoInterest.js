/**
* UserInfoInterest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'user_info_interests',
    schema: true,
    attributes: {
    	id: {
    		type: 'String',
    		primaryKey: true
    	},
    	value: 'String',
    	user: {
    		model: 'userinfo',
    		type: 'String'
    	}
    }
};

