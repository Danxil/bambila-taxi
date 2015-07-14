/**
 * Userpics.js
 *
 * @description :: User pictures
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
		category_id: {
			type: "Number",
			required: true
		}
	}
};