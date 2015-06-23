'use strict'

var queryService = require("./queryOfda.server.sevice");

module.exports.graphRpy = function (callback){
	var response = {};
	response.graphData = {};
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];

	console.log('in graph');

	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      search:'(distribution_pattern:VA+Virginia)+AND+(report_date:[2007-01-01+TO+2015+01+01])',
			      count:'report_date',
			      limit:1000, //if set to 0, it will default to 100 results
			      skip:0
			    }
			  };

				console.log(query);

		queryService.getData(query,function(error,data, query){
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



			if (completeQueries == datasets.length){
				response.graphData = {
					    series: getDisplayNames(),
					    data: [{
					      x: "2000",
					      y: [100, 500, 0]
					    }, {
					      x: "2001",
					      y: [300, 100, 100]
					    }, {
					      x: "2002",
					      y: [351]
					    }, {
					      x: "2003",
					      y: [54, 0, 879]
					    }]
					  };
				console.log('results: ' + JSON.stringify(response));
				callback(null, response);
			}


		});


	});


	function getDisplayNames(){
		var displayNames = [];
		datasets.forEach(function(dataset){
			displayNames.push(dataset.displayName);
		});

		return displayNames;
	}
};
