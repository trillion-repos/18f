'use strict';

var	openFDAController = require('../../app/controllers/openFDA.server.controller');

module.exports = function(app) {
	//app.route('/table/:appId/:datasetId/:qId').get(openFDAController.queryOpenFDA);
	app.route('/fetch/:appId/:datasetId/:fnId/:qId').get(openFDAController.queryOpenFDA);
};
