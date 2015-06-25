'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');

module.exports.graphRpy = function (params, callback){
	var response = {};
	var graphEntries = {};
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];
	var completeQueries = 0;
	var state = config.states[params.state];
	var it = 0;
	var monYearSwitch = params.year ? 6 : 4;
	var startYear = params.year ? params.year : (new Date().getFullYear() - 10);
	var endYear = params.year ? new Number(params.year) + 1 : new Number(new Date().getFullYear()) + 1;

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
			
			console.log("YEAR TOTALS: ", dataset.name, " : " ,JSON.stringify(yearTotals));
			
			for(var year in yearTotals){
				
				if(!graphEntries[year] )
					graphEntries[year] = {};
				
				graphEntries[year][query.noun]= yearTotals[year];
			}

			it++;
			//response.temp[dataset] = yearTotals;
			if (completeQueries == datasets.length){
				console.log(JSON.stringify(graphEntries));
				var graphData = [];
				var month = null;
				for(var year in graphEntries){
					if(params.year){
						month = year.substring(4);
						month = monthArray[new Number(month) - 1];
					}
					var y = [];
					
					datasets.forEach(function(dataset){
						if(graphEntries[year][dataset.name]){
							y.push(graphEntries[year][dataset.name]);
						}
						else{
							y.push(0);
						}
					});

					graphData.push({x:month || year, y: y});
				}
				
				console.log(JSON.stringify(graphData));
				response.graph = {series: getDisplayNames(), data: graphData};

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
