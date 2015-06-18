'use strict';

var	sftp = require('../../app/controllers/upload.server.controller');
var users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
	
	app.route('/form/app/:appId/mod/:modId/fn/:fnId')
		.get(users.requiresLogin, sftp.getFormById);
	
	app.route('/app/:appId/mod/:modId/fn/:fnId')
		.get(users.requiresLogin, sftp.getFileTransactionById)
		.post(users.requiresLogin, sftp.saveUploadForm);

};