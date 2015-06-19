'use strict';

var openFDAService = require('./../services/openfda.server.service');

module.exports.queryOpenFDA = function(req,res){
    var queryId = req.params.qId;
    console.log("quId: " + queryId);

    var currentQuery = {};

    queries.forEach(function(query){
      if(query.queryId === queryId){
        currentQuery = query;
      }
    })

    openFDAService.getData(currentQuery,function(error,data){
      console.log('callback');
      console.log(data);
    });
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
  return data;
};

var queries = [
  {
    queryId: 1,
    noun:'drug',
    endpoint:'enforcement',
    params:{
      search:'state:"VA"',
      count:'distribution_pattern',
      limit:25,
      skip:0
    }
  }
]
