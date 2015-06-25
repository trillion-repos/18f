var util = require('util');
var mapService = require('./mapOfda.server.service');
var graphService = require('./graphOfda.server.service');
var tableService = require('./tableOfda.server.service');

/*util.inherits(this, mapService);
util.inherits(this, graphService);*/

graphService.__proto__ = tableService;
mapService.__proto__ = graphService;
this.__proto__ = mapService;


