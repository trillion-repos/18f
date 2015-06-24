'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');

module.exports.graphRpy = function (params, callback){
	var response = {};
	var graphEntries = {};
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];

	var graphEntries = {};
	var completeQueries = 0;
	var state = config.states[params.state];
	var it = 0;
	var monYearSwitch = params.year ? 6 : 4;
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
			console.log("SIZE:" + data.results.length);
			//console.log("RAW DATA: ", data);

			
			var yearTotals = {};
			data.results.forEach(function(entry){
				var currentYear = entry.time.substring(0,monYearSwitch);
			
				if(yearTotals[currentYear])
					yearTotals[currentYear] += entry.count;
				else
					yearTotals[currentYear] = entry.count;
				
			});
			
			for(var year in yearTotals){
				
				if(!graphEntries[year] )
					graphEntries[year] = [];
				
				while(graphEntries[year].length < it)
					graphEntries[year].push(0);
				
				graphEntries[year].push(yearTotals[year]);
			}

			it++;
			//response.temp[dataset] = yearTotals;
			if (completeQueries == datasets.length){
				console.log(graphEntries);
				var graphData = [];
				var month = null;
				for(var entry in graphEntries){
					if(params.year){
						month = entry.substring(4);
						month = monthArray[new Number(month) - 1];
					}
					graphData.push({x:month || entry, y: graphEntries[entry]});
				}
				
				console.log(JSON.stringify(graphData));
				response.graph = {series: getDisplayNames(), data: graphData};


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
				console.log('GRAPH RESPONSE: ' + JSON.stringify(response));
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
