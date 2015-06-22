'use strict';

var openFDAService = require('./../services/openfda.server.service');
var queryCache = {};

module.exports.queryOpenFDA = function(req,res){
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

		var allTermQuery = {
	    queryId: 1,
	    noun:'drug',
	    endpoint:'enforcement',
	    params:{
	      //search:'distribution_pattern:"va"',
	      count:'distribution_pattern',
	      limit:0,
	      skip:0
	    }
	  }

		openFDAService.getData(allTermQuery,function(error,data, query){
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

			var stateCounts = {};
			data.results.forEach(function(entry){
				for(var state in states){
					if(entry.term === state || entry.term === states[state]){
						if(stateCounts[state]){
							stateCounts[state] = 0;
						}
						stateCounts[state] += entry.count;
					}
				}
			});




			stateCounts.forEach(function(state){
				var fillkey = 'U';
				switch (true) {
			case state.count < 200: fillkey = 'L';
				break;
			case state.count < 300: fillkey = 'M';
			break;
			case state.count < 400: fillkey = 'H';
			break;
			case state.count > 399: fillkey = 'VH';
			break;
			default:
				break;
			}
				results[state] = { fillKey: fillkey, count: state.count};

				resultsArray.push(state);
				resultsArray.sort(compareCount);

			});

			//console.log("temp: " + JSON.stringify(temp) + " : " + completeQueries);
			//if (completeQueries == stateQueries.length){
				var response = {};
				response.mapData = {};
				response.orderedData = {};
				response.mapDataTitle = {};
				response.mapData['Drugs'] = results;
				response.orderedData['Drugs'] = resultsArray;
				response.mapDataTitle['Drugs'] = "Drug Recals Per State";
				queryCache[queryId] = response;
				console.log('results: ' + JSON.stringify(response));
				res.send(response);
		//	}
			

		});


    stateQueries.forEach(function(entry){
      openFDAService.getData(entry,function(error,data, query){
    	  var temp = {};
    	  ++completeQueries;

    	  if(error){
    		  console.error("ERROR: ", JSON.stringify(error), JSON.stringify(entry));
    		  return;
    	  }

    	  if(data){
    		  data = JSON.parse(data);
    	  }

    	  if(!data.results){
    		  console.log("No Results for: " + JSON.stringify(entry));
    		  return;
    	  }
    	//console.log("results: " + JSON.stringify(data) + " : " + completeQueries);
        //console.log(entry.state + " : " + data.results[0].count + " : " + entry.params.search);
    	var totalCount = data.results[{term:query.stateName}].count;// +  data.results[query.stateName].count;
    	var fillkey = 'U';
    	switch (true) {
		case totalCount < 200: fillkey = 'L';
			break;
		case totalCount < 300: fillkey = 'M';
		break;
		case totalCount < 400: fillkey = 'H';
		break;
		case totalCount > 399: fillkey = 'VH';
		break;
		default:
			break;
		}

        results[query.stateAbbr] = { fillKey: fillkey, count: totalCount};
        temp.count = totalCount;
        temp.state = entry.state;
        resultsArray.push(temp);
        resultsArray.sort(compareCount);
        //console.log("temp: " + JSON.stringify(temp) + " : " + completeQueries);
        if (completeQueries == stateQueries.length){
        	var response = {};
        	response.mapData = {};
        	response.orderedData = {};
        	response.mapDataTitle = {};
        	response.mapData['Drugs'] = results;
        	response.orderedData['Drugs'] = resultsArray;
        	response.mapDataTitle['Drugs'] = "Drug Recals Per State";
        	queryCache[queryId] = response;
    	    console.log('results: ' + JSON.stringify(response));
    	    res.send(response);
        }

      });
    });


    // openFDAService.getData(currentQuery,function(error,data){
    //   console.log('callback');
    //   console.log(data);
    // });

};

/*
[
  {
    typeId,
    typeTitle,
    fields:[ { fieldName,
                fieldHeader,
                fieldValue
             }
            ...
           ]
  }
]

function transfromData(data){
  var result = {};
  var state = data.results[0].term
  result.push(
    {
       state:{
        fillKey: 'H',
        count: data.results[0].count
      }
    }
  );
  return result;
};
*/
function generateStateCountQueries(){
  var states = {
		  	"al": "alabama",
		    "ak": "alaska",
		    "az": "arizona",
		    "ar": "arkansas",
		    "ca": "california",
		    "co": "colorado",
		    "ct": "connecticut",
		    "de": "delaware",
		    "dc": "district of columbia",
		    "fl": "florida",
		    "ga": "georgia",
		    "hi": "hawaii",
		    "id": "idaho",
		    "il": "illinois",
		    "in": "indiana",
		    "ia": "iowa",
		    "ks": "kansas",
		    "ky": "kentucky",
		    "la": "louisiana",
		    "me": "maine",
		    "md": "maryland",
		    "ma": "massachusetts",
		    "mi": "michigan",
		    "mn": "minnesota",
		    "ms": "mississippi",
		    "mo": "missouri",
		    "mt": "montana",
		    "ne": "nebraska",
		    "nv": "nevada",
		    "nh": "new hampshire",
		    "nj": "new jersey",
		    "nm": "new mexico",
		    "ny": "new york",
		    "nc": "north carolina",
		    "nd": "north dakota",
		    "oh": "ohio",
		    "ok": "oklahoma",
		    "or": "oregon",
		    "pa": "pennsylvania",
		    "ri": "rhode island",
		    "sc": "south carolina",
		    "sd": "south dakota",
		    "tn": "tennessee",
		    "tx": "texas",
		    "ut": "utah",
		    "vt": "vermont",
		    "va": "virginia",
		    "wa": "washington",
		    "wv": "west virginia",
		    "wi": "wisconsin",
		    "wy": "wyoming"/*,
		    "u.s.":"nationwide"*/
  };
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
