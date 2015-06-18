'use strict';

var openFDAService = require('./../services/openfda.server.service');

export.queryOpenFDA = function(req,res){
    var queryId = req.params.qId;
    query = getQuery(queryId);
    console.log("quId: " + qId);
    opeFDASservice.getData(err, query, callback);
    result = "success";
    console.log("result: " + result);
    res.send(result);
};

function transfromData(data){
  return data;
};

function getQuery(queryId){
  return "";
};
