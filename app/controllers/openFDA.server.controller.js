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

    stateQueries.forEach(function(entry){
      openFDAService.getData(entry,function(error,data){
        data = JSON.parse(data);
        console.log(data.results[0].term + " : " + data.results[0].count);
        results[data.results[0].term] = { filkey: 'H', count: data.results[0].count};
        console.log(results);
      });
    });

    console.log('results');
    console.log(results);

    // openFDAService.getData(currentQuery,function(error,data){
    //   console.log('callback');
    //   console.log(data);
    // });

    var result = "success";
    console.log("result: " + result);
    res.send(result);
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
  var states = ['va','tx','ny'];
  var stateQueries = [];
  states.forEach(function(state){
    stateQueries.push(
      {
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
