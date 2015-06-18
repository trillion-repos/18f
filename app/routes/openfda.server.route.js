'use strict';

var	openFDAController = require('../../app/controllers/openFDA.server.controller');

module.exports = function(app) {
	app.route('/query/:qId').get(openFDAController.queryOpenFDA);
};
