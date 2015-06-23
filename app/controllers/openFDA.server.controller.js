'use strict';

var openFDAService = require('./../services/mapOfda.server.service');
var config = require("./../../config/config");
var queryCache = {};


module.exports.queryOpenFDA = function(req, res){
	var queryId = req.params.qId;

    if(queryCache[queryId]){//TODO add expiration to cache. Make it more sophisticated, maybe memcache
    	res.send(queryCache[queryId]);
    	return;
    }
    
    if(typeof(openFDAService[queryId]) == 'function')
    	openFDAService[queryId](function(error, response){
    		if(error)
    			res.status("500").send(error.message);
    		else{
    			queryCache[queryId] = response;
    			res.send(response);
    		}
    	});
}
