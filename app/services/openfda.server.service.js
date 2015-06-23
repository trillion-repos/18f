'use strict';

var request = require('request');
var allProperites = require('./../../config/env/all.js');

module.exports.getData = function(query, callback){
  var queryUrl = new openFDAUrl(query);
  queryUrl.generateCompleteUrl;
  console.log("Query URL: " + queryUrl.completeUrl);

  request(queryUrl.completeUrl, function (error, response, data){
      if (error) {
        callback(error);
      } else if (response.statusCode !== 200) {
        callback(response);
      } else{
        callback(error,data, query);
      }
  });

};

/*module.exports.mapRps = function(callback){
	var response = {};
	response.mapData = {};
	response.orderedData = {};
	response.mapDataTitle = {}; 
	response.mapDataFills = {};
	response.mapDataLegends = {};
    var completeQueries = 0;  
    
    
    var datasets = [{name:"drug",title:"Drug Recals Per State", defaultFill:"#ECECEA", thresholds:[{val:200, color:"#D5E7E6", key:"L"}, {val:300, color:"#74AFAD", key:"M"}, {val:400, color:"#558C89", key:"H"}, {val:400, color:"#2a4644", key:"VH"}]}, 
                    {name:"device",title:"Device Recals Per State", defaultFill:"#ECECEA",thresholds:[{val:1000, color:"#d5a9a3", key:"L"}, {val:1500, color:"#b5685f", key:"M"}, {val:2000, color:"#96281b", key:"H"}, {val:2000, color:"#691c12", key:"VH"}]}, 
                    {name:"food",title:"Food Recals Per State", defaultFill:"#ECECEA",thresholds:[{val:500, color:"#dbefe4", key:"L"}, {val:1000, color:"#82c7a3", key:"M"}, {val:2000, color:"#4daf7c", key:"H"}, {val:2000, color:"#357a56", key:"VH"}]}                    
                  ];
    
    
    datasets.forEach(function(dataset){
    	var results = {};
        var resultsArray = [];
        
    });
    
    
    
	var query = buildQuery();
	fetchData(query);
	transfomData();
	callback(response);
	
	
	
	 function findKeyFill(dataset, count){
	    	var max = {};
	    	for(var i = 0; i < dataset.thresholds.length; i++){
	    		var th = dataset.thresholds[i];
	    		if(count < th.val)
	    			return th;
	    		else
	    			max = th;
	    	}
	    	
	    	return max;
	    }
	    
	    function getFills(dataset){
	    	var fills = {};
	    	dataset.thresholds.forEach(function(th){
	    		fills[th.key] = th.color;
	    	});
	    	fills['defaultFill'] = dataset.defaultFill;	
	    	return fills;
	    }
	    
	    function getLegends(dataset){
	    	var labels = {};
	    	var i =0;
	    	dataset.thresholds.forEach(function(th){
	    		
	    		if(++i == dataset.thresholds.length)
	    			labels[th.key] =  th.val + " >= ";
	    		else	
	    			labels[th.key] = " < " + th.val;
	    		
	    	});
	    	labels['defaultFill'] = 'unknown';
	    	return labels;
	    }
};

function buildQuery(){
	
}*/

function openFDAUrl(query){
  var self = this;
  self.openFDABaseUrl = 'https://api.fda.gov/' + query.noun + '/' + query.endpoint + '.json';

  var addUrlParam = function(url,key,value,atStart){
    if(atStart){
      return url += '?' + key + '=' + (value);
    } else {
      return url += '&' + key + '=' + (value);
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
