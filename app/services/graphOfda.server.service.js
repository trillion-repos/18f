'use strict'

var queryService = require("./queryOfda.server.service");

module.exports.graphRpy = function (params, callback){
	var response = {};
	response.graphData = {};
	response.temp = {};
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];

	console.log('in graph');
	var completeQueries = 0;

	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      search:'(distribution_pattern:VA+Virginia)+AND+(report_date:[1900-01-01+TO+2018-01-01])',
			      count:'report_date',
			      limit:1000, //if set to 0, it will default to 100 results
			      skip:0
			    }
			  };

//				console.log(query);

		queryService.getData(query,function(error,data, query){
			completeQueries++;

			if(error){
				console.error("ERROR: ", JSON.stringify(error), JSON.stringify(query));
				return;
			}

			if(data){
				data = JSON.parse(data);
			}

			if(!data.results){
				console.log("No Results for: " + JSON.stringify(query));
				return;
			}
			console.log("SIZE:" + data.results.length);
			console.log("RAW DATA: ", data);

			/*
			[
				{
					year: 2012
					count: 56
				}
			]

			*/

			var yearTotals = [];
			data.results.forEach(function(entry){
				var currentYear = entry.time.substring(0,4);
			//	console.log("CurrentYear: " + currentYear);
				//console.log(yearTotals.length);
				if(yearTotals.length > 0){
					for(var i = 1; i < yearTotals.length; i++){
						//console.log("In year total loop " + yearTotals.length);
						//console.log(yearTotals);
						if(yearTotals[i].year == currentYear){
							//console.log("Encremrnting year - " + yearTotals[i].year );
							yearTotals[i].count += entry.count;
						} else {
							yearTotals.push({year: currentYear, count: entry.count});
						}
					}
				} else {
				//	console.log("Making new year");
					yearTotals.push({'year': currentYear, 'count': entry.count});
				}

				//console.log("YEAR: " + year);
			});

			console.log(yearTotals);
			response.temp[dataset] = yearTotals;
			if (completeQueries == datasets.length){

			//	response.temp.forEach(funciton(entry){
			//		var data = [];
			///		var x = entry.;
			//		var y = [];
				//});


				/*response.graphData = {
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
					  };*/
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
