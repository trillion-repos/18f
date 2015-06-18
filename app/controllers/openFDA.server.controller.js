'use strict';

var openFDAService = require('./../services/openfda.server.service');

module.exports.queryOpenFDA = function(req,res){
    var queryId = req.params.qId;
    var query = getQuery(queryId);
    console.log("quId: " + queryId);
    openFDAService.getData(query);
    var result = "success";
    console.log("result: " + result);
    res.send(result);
};

function transfromData(data){
  return data;
};

function getQuery(queryId){
  return "";
};
