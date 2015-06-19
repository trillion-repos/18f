'use strict';

var core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
	
	app.route('/nav').get(core.nav);

};