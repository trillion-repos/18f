'use strict';

var request = require('request');
var allProperites = require('./../../config/env/all.js');

module.exports.getData = function(query, callback){
  var queryUrl = new openFDAUrl(query);
  queryUrl.generateCompleteUrl;
  console.log("Query URL: " + queryUrl.completeUrl);

  request(queryUrl.completeUrl, function (error, response, data){
      if (error)
    	  callback(error);
      
      else if (response.statusCode !== 200)
    	  callback(response);

      else{
        callback(error,data);
      }
      

  });

}

function openFDAUrl(query){
  var self = this;
  self.openFDABaseUrl = 'https://api.fda.gov/' + query.noun + '/' + query.endpoint + '.json';

  var addUrlParam = function(url,key,value,atStart){
    if(atStart){
       return url += '?' + key + '=' + encodeURIComponent(value);
    } else {
       return url += '&' + key + '=' + encodeURIComponent(value);
    }
  };

  var index = 0;
  self.generateCompleteUrl = function(){
    for (var property in query.params) {
      if(index == 0){
        self.completeUrl = addUrlParam(self.openFDABaseUrl,property,query.params[property],true);
      }else {
        self.completeUrl = addUrlParam(self.completeUrl,property,query.params[property],false);
      }
      index++;
    }
  };

  self.generateCompleteUrl();
  return self;
};
