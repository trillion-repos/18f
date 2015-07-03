'use strict';

var	openFDAController = require('../../app/controllers/openFDA.server.controller');

module.exports = function(app) {
	app.route('/fetch/:appId/:datasetId/:fnId/:qId').get(openFDAController.queryOpenFDA);
};
