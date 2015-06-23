'use strict'

var queryService = require("./queryOfda.server.sevice");

modules.exports.graphRpy = function (callback){
	var response = {};
	var datasets = [{name:'drug'},{name:'device'},{name:'food'}];
	
	
	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      //search:'distribution_pattern:"va"',
			      count:'distribution_pattern',
			      limit:1000, //if set to 0, it will default to 100 results
			      skip:0
			    }
			  };
		
		queryService.getData(allTermQuery,function(error,data, query){
			completeQueries++;
			
			if(error){
				console.error("ERROR: ", JSON.stringify(error), JSON.stringify(allTermQuery));
				return;
			}

			if(data){
				data = JSON.parse(data);
			}

			if(!data.results){
				console.log("No Results for: " + JSON.stringify(allTermQuery));
				return;
			}
			
			//console.log("RAW DATA: ", data);
			
			//response.mapData[dataset.name] = results;
			
			if (completeQueries == datasets.length){					
				console.log('results: ' + JSON.stringify(response));
				callback(null, response);
			}
			

		});
		
		
	});
};