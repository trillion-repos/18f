'use strict';

var queryService = require("./queryOfda.server.service");
var config = require("./../../config/config");
var states = config.states;



module.exports.mapRps = function(params, callback){
	var response = {};
	response.mapData = {};
	response.orderedData = {};
	response.mapDataTitle = {};
	response.mapDataFills = {};
	response.mapDataLegends = {};
    var completeQueries = 0;


    var datasets = [{name:"drug",title:"Drug Recalls Per State", defaultFill:"#ECECEA", selectedFill:'#f5d76e', thresholds:[{val:200, color:"#D5E7E6", key:"L"}, {val:300, color:"#74AFAD", key:"M"}, {val:400, color:"#558C89", key:"H"}, {val:400, color:"#2a4644", key:"VH"}]},
                    {name:"device",title:"Device Recalls Per State", defaultFill:"#ECECEA",selectedFill:'#f5d76e',thresholds:[{val:1000, color:"#d5a9a3", key:"L"}, {val:1500, color:"#b5685f", key:"M"}, {val:2000, color:"#96281b", key:"H"}, {val:2000, color:"#691c12", key:"VH"}]},
                    {name:"food",title:"Food Recalls Per State", defaultFill:"#ECECEA",selectedFill:'#f5d76e', thresholds:[{val:500, color:"#dbefe4", key:"L"}, {val:1000, color:"#82c7a3", key:"M"}, {val:2000, color:"#4daf7c", key:"H"}, {val:2000, color:"#357a56", key:"VH"}]}
                  ];


    datasets.forEach(function(dataset){
    	var results = {};
        var resultsArray = [];

		var allTermQuery = {
		    queryId: 1,
		    noun:dataset.name,
		    endpoint:'enforcement',
		    params:{
		      //search:'distribution_pattern:"va"',
		      count:'distribution_pattern',
		      limit:1000, //if set to 0, it will default to 100 results
		      skip:0
		    }
		  }

		queryService.getData(allTermQuery,function(error,data, query){
				completeQueries++;

				if(error){
					console.error("ERROR: ", JSON.stringify(error), JSON.stringify(allTermQuery));
				}

				if(data){
					data = JSON.parse(data);
				}else{
					data = {};
				}

				if(!data.results){
					console.log("No Results for: " + JSON.stringify(allTermQuery));
					data.results = [];
				}

				//console.log("RAW DATA: ", data);

				var stateCounts = {};
				data.results.forEach(function(entry){
					for(var state in states){
						if(entry.term === state || entry.term === states[state]){
							if(!stateCounts[state]){
								stateCounts[state] = 0;
							}
							stateCounts[state] += entry.count;
						}
					}
				});



				for(var state in stateCounts){
					var th = findKeyFill(dataset, stateCounts[state] );
					//console.log(state, " : " , stateCounts[state]);
					results[state] = { fillKey: th.key, count: stateCounts[state], label: th.val};
					resultsArray.push({state:state, count:stateCounts[state]});
				}


				resultsArray.sort(compareCount);


				response.mapData[dataset.name] = results;
				response.orderedData[dataset.name] = resultsArray;
				response.mapDataTitle[dataset.name] = dataset.title;
				response.mapDataFills[dataset.name] = getFills(dataset);
				response.mapDataLegends[dataset.name] = getLegends(dataset);

				if (completeQueries == datasets.length){
//					console.log('results: ' + JSON.stringify(response));
					callback(null, response);
				}


			});
    });//end dataset iteration


	 function findKeyFill(dataset, count){
	    	var max = {};
	    	for(var i = 0; i < dataset.thresholds.length; i++){
	    		var th = dataset.thresholds[i];
	    		if(count < th.val)
	    			return th;
	    		else
	    			max = th;
	    	}

	    	return max;
	    }

	    function getFills(dataset){
	    	var fills = {};
	    	dataset.thresholds.forEach(function(th){
	    		fills[th.key] = th.color;
	    	});
	    	fills['defaultFill'] = dataset.defaultFill;
	    	fills['selectedFill'] = dataset.selectedFill;
	    	return fills;
	    }

	    function getLegends(dataset){
	    	var labels = {};
	    	var i =0;
	    	dataset.thresholds.forEach(function(th){

	    		if(++i == dataset.thresholds.length)
	    			labels[th.key] =  th.val + " >= ";
	    		else
	    			labels[th.key] = " < " + th.val;

	    	});
	    	labels['defaultFill'] = 'unknown';
	    	return labels;
	    }

	    function compareCount(a,b) {
	  	  if (a.count > b.count){
	      return -1;
	    }
	  	  if (a.count < b.count){
	      return 1;
	    }

	  	  return 0;
	  }
};
