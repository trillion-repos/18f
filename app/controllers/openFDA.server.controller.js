'use strict';

var openFDAService = require('./../services/openfda.server.service');
var config = require("./../../config/config");
var queryCache = {};
var states = config.states;

module.exports.queryOpenFDA = function(req,res) {
    //var queryId = 1;//req.params.qId;
    //console.log("quId: " + queryId);

    var queryId = req.params.qId;

    if(queryCache[queryId]){//TODO add expiration to cache. Make it more sophisticated, maybe memcache
    	res.send(queryCache[queryId]);
    	return;
    }

    var currentQuery = {};

    // queries.forEach(function(query){
    //   if(query.queryId === queryId){
    //     currentQuery = query;
    //   }
    // })

    var stateQueries = generateStateCountQueries();
    var results = {};
    var completeQueries = 0;
    var resultsArray = [];
    var datasets = ["drug", "device", "food"];

    datasets.forEach(function(dataset){

		var allTermQuery = {
		    queryId: 1,
		    noun:dataset,
		    endpoint:'enforcement',
		    params:{
		      //search:'distribution_pattern:"va"',
		      count:'distribution_pattern',
		      limit:1000, //if set to 0, it will default to 100 results
		      skip:0
		    }
		  }

			openFDAService.getData(allTermQuery,function(error,data, query){
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

				for(var state in stateCounts) {
					var fillkey = 'U';

					switch (true) {
						case stateCounts[state] < 200:
							fillkey = 'L';
							break;
						case stateCounts[state] < 300:
							fillkey = 'M';
							break;
						case stateCounts[state] < 400:
							fillkey = 'H';
							break;
						case stateCounts[state] > 399:
							fillkey = 'VH';
							break;
						default:
							break;
					}
					results[state] = { fillKey: fillkey, count: stateCounts[state]};
					resultsArray.push({state:state, count:stateCounts[state]});
				}


				resultsArray.sort(compareCount);

				var response = {};
				response.mapData = {};
				response.orderedData = {};
				response.mapDataTitle = {};
				response.mapData[dataset] = results;
				response.orderedData[dataset] = resultsArray;
				response.mapDataTitle[dataset] = "Drug Recals Per State";

				if (completeQueries == datasets.length) {
					queryCache[queryId] = response;
					console.log('results: ' + JSON.stringify(response));
					res.send(response);
				}

			});
    });//end dataset iteration
};

function generateStateCountQueries(){

  var stateQueries = [];
  for(var state in states){
    stateQueries.push(
      {
    	stateName:states[state],
    	stateAbbr:state,
        queryId: 1,
        noun:'drug',
        endpoint:'enforcement',
        params:{
          search:'(distribution_pattern:"' + state + '"+distribution_pattern:"' + states[state] + '")',
          count:'distribution_pattern',
          limit:0,
          skip:0
        }
      }
    );
  };

  console.log("stateQueries:");
  console.log(stateQueries);
  return stateQueries;
}

function stateQuery() {
    this.queryId = "name";
    this.noun = "gradingareas";
    this.endpoint = "finalgrade";
    this.params.search = "finalgrade";
    this.params.count = "finalgrade";
    this.params.limit = "finalgrade";
    this.params.skip = "test";
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

var queries = [
  {
    queryId: 1,
    noun:'drug',
    endpoint:'enforcement',
    params:{
      search:'distribution_pattern:"va"',
      count:'distribution_pattern',
      limit:0,
      skip:0
    }
  }
]
