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
        resultsArray.sort(compare);
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
  var states = ['AL',
                'AK',
                'AZ',
                'AR',
                'CA',
                'CO',
                'CT',
                'DE',
                'FL',
                'GA',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'OH',
                'OK',
                'OR',
                'PA',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY'];
  var stateQueries = [];
  states.forEach(function(state){
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
  });

  //console.log(stateQueries);
  return stateQueries;
}

function compare(a,b) {
	  if (a.count > b.count)
	    return -1;
	  if (a.count < b.count)
	    return 1;
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
