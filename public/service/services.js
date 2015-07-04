'use strict';

/* Services */

openFDA.factory('SharedDataSrvc', ['FetchOpenFDASrvc','$location','$anchorScroll',
function(FetchOpenFDASrvc, $location, $anchorScroll) {
	 var graphData;
	 var view;
	 var foundData = false;
	 var tableData;
	 var currentYear;
	 var mapData;
	 var fillKey;
	 var currentState;
	 var dataset = 'drug';

	 
     function getGraphData() {
        return graphData;
    }
     
     function getView(){
    	 return view;
     }
     
     function setView(v){
    	 console.log("Set View: " + v);
    	 view = v;
     }
     
     function getFoundData(){
    	 return foundData;
     }
     
     function getTableData(){
    	 return tableData;
     }
     
     function removeTableData(){
    	 tableData = {};
     }
     
     function getYear(){
    	 return currentYear;
     }
     
     function getFillKey(){
    	 return fillKey;
     }
     
     function getState(){
    	 return currentState;
     }
     
     function clearGraph(){
    	 foundData = false;
    	 graphData = {};
     }
     
     function getSelectedDataset(){
    	 return dataset;
     }
     
     function setSelectedDataset(d){
    	 dataset = d; 
     }
     
     function getMapData(routeParams, qId, callback){    	 
    	 if (mapData){
    		 callback(null, mapData, true);
    	 }
    	 else{
	    	 FetchOpenFDASrvc.get({appId:routeParams.appId, modId: routeParams.modId, fnId:routeParams.fnId, qId:qId},
	 				function success(response) {
	 					
	 				//SharedDataSrvc.setView("mapRps");
	 				
	 					if(!response){
	 						console.warn("No data found for MapId="+routeParams);
	 						callback(null, {});
	 					}
	 					
	 	
	 					//console.log("Map Success:" + JSON.stringify(response));
	 					mapData =  response;
	 					callback(null, response);
	 					
	 					},
	 				function error(errorResponse) {
	 					console.log("Error:" + JSON.stringify(errorResponse));
	 					callback(err);
	 					});
    	 }
     }
     
     function fetchData (qId, state, routeParams, year, month, fk){
    	 if(fk)
    		 fillKey = fk;
    	 currentState = state;
    	 foundData = true;
 		var graphParams = {};
 		graphParams.appId = routeParams.appId;
 		graphParams.modId = routeParams.modId;
 		graphParams.fnId = routeParams.fnId;
 		graphParams.qId = qId;
 		graphParams.state = state.stateCode.toLowerCase();
 		
 		
 		if(year){
 			graphParams.year = year;
 			currentYear = year;
 		}
 		
 		if(month)
 			graphParams.month = month;
 		
 		FetchOpenFDASrvc.get(graphParams, function success(response) {
 					
 					
 					if(!response){
 						console.warn("No data found for graph="+$routeParams);
 						return;
 					}
 					

 					//console.log("Response Success:" + JSON.stringify(response));
 					
 					if(response.graph){
	 					graphData = {};
	 					graphData.state = state; 					
	 					graphData.data = response.graph;
	 					graphData.title = response.graphTitle; 		
	 					}
 					
 					if(response.table){
 						tableData = {};
 						tableData.title = response.tableTitle;
 						tableData.columns = response.columns;
 						tableData.data = response.table;

 					}
 					
 					},
 				function error(errorResponse) {
 					console.log("Error:" + JSON.stringify(errorResponse));				
 					//$scope.error.push(errorResponse.data);
 					});
 	}

    
    return {
    	fetchData: fetchData,
    	getGraphData : getGraphData,
    	getView: getView,
    	setView: setView,
    	getFoundData : getFoundData,
    	getTableData : getTableData,
    	getYear : getYear,
    	getMapData : getMapData,
    	removeTableData : removeTableData,
    	getFillKey : getFillKey,
    	getState : getState,
    	clearGraph : clearGraph,
    	getSelectedDataset : getSelectedDataset,
    	setSelectedDataset : setSelectedDataset
    }

}]);



