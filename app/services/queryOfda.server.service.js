'use strict'

var request = require('request');
var config = require("./../../config/config");
var logger = require('./../utils/logger.js')(module);

var lastQueryTimeStamp = new Date().getTime();

var getData = module.exports.getData = function(query, callback){
  var timeOut = 0;
  var queryUrl = new openFDAUrl(query);

  var currentQueryTime = new Date().getTime();

  if((currentQueryTime - 500) >= lastQueryTimeStamp){
    timeOut = 500;
  } else {
    timeOut = 0;
  }

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

function openFDAUrl(query){
	  var self = this;
	  self.openFDABaseUrl = 'https://api.fda.gov/' + query.noun + '/' + query.endpoint + '.json?api_key=' + config.openFDAKey;

	  var addUrlParam = function(url,key,value){
	      return url += '&' + key + '=' + (value);
	  };

	  var index = 0;
	  self.generateCompleteUrl = function(){
	    for (var property in query.params) {
	      if(index == 0){
	        self.completeUrl = addUrlParam(self.openFDABaseUrl,property,query.params[property]);
	      }else {
	        self.completeUrl = addUrlParam(self.completeUrl,property,query.params[property]);
	      }
	      index++;
	    }
	  };

	  self.generateCompleteUrl();
	  return self;
	};
