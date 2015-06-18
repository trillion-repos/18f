'use strict';

var request = require('request');
var allProperites = require('./../../config/env/all.js');

var openFDABaseUrl='https://api.fda.gov/drug/event.json';

var openFDAUrl = function(noun,endpoint,params){

};

function getData(err, query, callback) {
  if (err)
    return console.error(err);

  var completeUrl = openFDABaseUrl;
  completeUrl = addUrlParam(completeUrl,'api_key',allProperites.openFDAKey,true);
  completeUrl = addUrlParam(completeUrl,'search','patient.drug.openfda.pharm_class_epc:"nonsteroidal+anti-inflammatory+drug"',false);
  completeUrl = addUrlParam(completeUrl,'count','patient.reaction.reactionmeddrapt.exact',false);

  console.log(completeUrl);

  request(completeUrl, function (error, response, body) {
      if (error)
        return console.error(error)

      if (!error && response.statusCode == 200) {
        console.log(body);
      }

  })

}

function addUrlParam(url,key,value,atStart){
  if(atStart){
     return url += '?' + key + '=' + encodeURIComponent(value);
  } else {
     return url += '&' + key + '=' + encodeURIComponent(value);
  }
}

getData();
