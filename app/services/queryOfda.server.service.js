'use strict'

var request = require('request');
var logger = require('./../utils/logger.js')(module);
var openFDAUrl = require("./../models/query.server.model");

var lastQueryTimeStamp = new Date().getTime();

module.exports.getData = function(query, callback){
  var timeOut = 300; //setting time out to 300 ms due to limitaions in API that prevent too many calls per second
  var queryUrl = new openFDAUrl(query);

  queryUrl.generateCompleteUrl;
  logger.info("Query URL: " + queryUrl.completeUrl);
  setTimeout(function(){
    request(queryUrl.completeUrl, function (error, response, data){
        if (error) {
          callback(error);
        } else if (response.statusCode !== 200) {
          callback(response);
        } else{
          callback(error,data, query);
        }
    });
  },timeOut);

  lastQueryTimeStamp = new Date().getTime();
};
