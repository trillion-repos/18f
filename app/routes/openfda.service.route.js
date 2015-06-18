'use strict';

var	openFDA = require('../../app/controllers/openFDA.server.controller');

module.exports = function(app) {

	app.route('/form/app/:appId/mod/:modId/fn/:fnId')
		.get(users.requiresLogin, sftp.getFormById);

	app.route('/app/:appId/mod/:modId/fn/:fnId')
		.get(users.requiresLogin, sftp.getFileTransactionById)
		.post(users.requiresLogin, sftp.saveUploadForm);

};
