'use strict';

exports.getFormById = function(req, res) {
	
	res.json( require('../models/forms.js')(req.params.formId));		

};

