'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');

module.exports.tableRpm = function (params, callback){
	var response = {};

	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];


	var completeQueries = 0;
	var state = config.states[params.state];

	var startYear = params.year ? params.year : (new Date().getFullYear() - 10);
	var endYear = params.year ? new Number(params.year) + 1 : new Number(new Date().getFullYear()) + 1

	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      search:'(distribution_pattern:"'+params.state+'"+distribution_pattern:"'+state+'")+AND+(report_date:['+startYear+'-01-01+TO+'+endYear+'-01-01])',
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
			}

			if(data){
				data = JSON.parse(data);
			}else{
				data = {};
			}

			if(!data.results){
				console.log("No Results for: " + JSON.stringify(query));
				data.results = [];
			}

			console.log("RAW DATA: ", data);


			//response.temp[dataset] = yearTotals;
			if (completeQueries == datasets.length){
				
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
	
	var monthArray = new Array();
	monthArray[0] = "Jan";
	monthArray[1] = "Feb";
	monthArray[2] = "Mar";
	monthArray[3] = "Apr";
	monthArray[4] = "May";
	monthArray[5] = "Jun";
	monthArray[6] = "Jul";
	monthArray[7] = "Aug";
	monthArray[8] = "Sep";
	monthArray[9] = "Oct";
	monthArray[10] = "Nov";
	monthArray[11] = "Dec";
};
