/**
* UserInfo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'user_info',
    schema: true,
    attributes: {
    	user: {
			type: 'String',
			primaryKey: true
		},
        birthday: 'Date',
        height: 'String',
        nationality: 'String',
        zodiac: 'String',
        race: 'String',
        gender: 'String',
        language: 'String',
        religion: 'String',
        smoking: 'String',
        marital: 'String',
        orientation: 'String',
        kids: 'String',
        weight: 'String',
        interests: {
        	collection: 'userInfoInterest',
        	via: 'user'
        }
        //,
        // photos: []
    }
};
