var util = require('util');
var mapService = require('./mapOfda.server.service');
var graphService = require('./graphOfda.server.service');

/*util.inherits(this, mapService);
util.inherits(this, graphService);*/

mapService.__proto__ = graphService;
this.__proto__ = mapService;


