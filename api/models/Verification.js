/**
* Verification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    adapter: 'node_rideshare',
    tableName: 'verifications',
    schema: true,

    attributes: {
    	phone_verified: "String",
        mobile2_verified: "String",
        address_verified: "String", 
        is_verified: "bool", 
        face_verified: "String", 
        passport_verified: "String", 
        facePassport_verified: "String",
        driverLicense_verified : "String",
        criminalBackground_verified : "String",
        user: {
        	model: "user"
        }
    }
};