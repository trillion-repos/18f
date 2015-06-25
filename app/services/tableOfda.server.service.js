'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');

module.exports.tableRpm = function (params, callback){
	var response = {};	
	var cols = [];
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Food"}];
	var completeQueries = 0;
	var state = config.states[params.state];
	var month = params.month ? getMonthNumber(params.month) : {startMonth:1, nextMonth:1};
	var startYear = params.year ? params.year : (new Date().getFullYear() - 10);
	var endYear = month.startMonth === 12 ? startYear +1 : startYear;
	if(!params.month)
		endYear = params.year ? new Number(params.year) + 1 : new Number(new Date().getFullYear()) + 1;
	var it =0;	
	var tableData = [];
	
	
	datasets.forEach(function(dataset){
		
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      search:'(distribution_pattern:"'+params.state+'"+distribution_pattern:"'+state+'")+AND+(report_date:['+startYear+'-'+month.startMonth+'-01+TO+'+endYear+'-'+month.nextMonth+'-01])',
			      limit:100, //if set to 0, it will default to 1 results
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
			
			console.log("RAW DATA COUNT: ", data.results.length);
			//console.log("RAW DATA: ", JSON.stringify(data));
			
			if(data.results.length){
				var column = {};
				
			}
			
			data.results.forEach(function(result){
				
				
				
				var d = {};
					for(var header in result){
						
						if(header.startsWith("@") || result[header] === "openfda")
							continue;
						
						if(it === 0){ // set headers
							
														
							
							var column = {};
							column['title'] = header.replaceAll("_", " ").capitalize(true);
							column['field'] = header;
							column['filter'] = {};
							column.filter[column['field'] ] = 'text';
							cols.push(column);
						}
						
						d[header] = result[header];
						
					}
					tableData.push(d);
					it++;
				
			});


			console.log(dataset, JSON.stringify(tableData));
			console.log(JSON.stringify(cols));
			if (completeQueries == datasets.length){
				response.tableTitle = "Recalls for " + startYear +" per Month for " + state.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
				response.table = tableData;
								/*[
				                  	{recall_number:'Z-1409-2015', status:"Ongoing"},
									{recall_number:'A-1410-2015', status:"Ongoing"}
		                          ];*/
									
				
				response.columns = cols;
				
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
	
	function getMonthNumber(monString){
		var monthObj = {};
		monthObj["jan"] = 1;
		monthObj["feb"] = 2;
		monthObj["mar"] = 3;
		monthObj["apr"] = 4;
		monthObj["may"] = 5;
		monthObj["jun"] = 6;
		monthObj["jul"] = 7;
		monthObj["aug"] = 8;
		monthObj["sep"] = 9;
		monthObj["oct"] = 10;
		monthObj["nov"] = 11;
		monthObj["dec"] = 12;
		
		var monthNumber = monthObj[monString.toLowerCase()];
		var nextMonth = 0;
		
		if(monthNumber == 12)
			nextMonth =1;
		else
			nextMonth = monthNumber + 1;
		
		return {startMonth:monthNumber, nextMonth:nextMonth };
	}
};
