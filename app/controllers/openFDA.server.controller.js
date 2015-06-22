'use strict';

var openFDAService = require('./../services/openfda.server.service');

module.exports.queryOpenFDA = function(req,res){
    //var queryId = 1;//req.params.qId;
    //console.log("quId: " + queryId);

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

    stateQueries.forEach(function(entry){
      openFDAService.getData(entry,function(error,data){
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
    	var fillkey = 'U';
    	switch (true) {
		case data.results[0].count < 200: fillkey = 'L';
			break;
		case data.results[0].count < 300: fillkey = 'M';
		break;
		case data.results[0].count < 400: fillkey = 'H';
		break;
		case data.results[0].count > 399: fillkey = 'VH';
		break;
		default:
			break;
		}
        results[entry.state] = { fillKey: fillkey, count: data.results[0].count};
        temp.count = data.results[0].count;
        temp.state = entry.state;
        resultsArray.push(temp);
        resultsArray.sort(compareCount);
        //console.log("temp: " + JSON.stringify(temp) + " : " + completeQueries);
        if (completeQueries == stateQueries.length){
        	var response = {};
        	response.mapData = results;
        	response.orderedData = resultsArray;
        	response.mapDataTitle = "Drug Recals Per State";
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
*/
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

function generateStateCountQueries(){
  var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming",
    "U.S.":"Nationwide"
  }
  var stateQueries = [];
  for(var state in states){
    stateQueries.push(
      {
    	state:state,
        queryId: 1,
        noun:'drug',
        endpoint:'enforcement',
        params:{
          search:'distribution_pattern:"' + state + '"',
          count:'distribution_pattern',
          limit:0,
          skip:0
        }
      }
    );
    stateQueries.push(
      {
      state:state,
        queryId: 1,
        noun:'drug',
        endpoint:'enforcement',
        params:{
          search:'distribution_pattern:"' + state[state] + '"',
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
