'use strict';
var crypto = require('crypto');
var openFDAService = require('./../services/openFDA.server.service');
var config = require("./../../config/config");
var queryCache = {};


module.exports.queryOpenFDA = function(req, res){
	var queryId = req.params.qId;
	console.log("query = ", queryId, " ", JSON.stringify(req.query));
	var key = crypto.createHash('md5').update(queryId+JSON.stringify(req.query)).digest('hex');
	
    if(queryCache[key]){//TODO add expiration to cache. Make it more sophisticated, maybe memcache
    	console.log("Query already Cached...");
    	res.send(queryCache[key]);
    	return;
    }
    
    if(typeof(openFDAService[queryId]) == 'function'){    	
    	
    	openFDAService[queryId](req.query, function(error, response){
    		if(error)
    			res.status("500").send(error.message);
    		else{
    			//queryCache[key] = response;
    			res.send(response);
    		}
    	});
    }
    else{
    	console.log(JSON.stringify(queryId, " is not a function"));
    	res.status("500").send("QueryId : " + queryId + " not Suported.");
    }
}
