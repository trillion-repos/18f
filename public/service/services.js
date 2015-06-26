'use strict';

/* Services */

openFDA.factory('SharedDataSrvc', ['FetchOpenFDASrvc','$location','$anchorScroll',
function(FetchOpenFDASrvc, $location, $anchorScroll) {
	 var graphData;
	 var showingMonth = false;
	 var foundData = false;
	 var tableData;

	 
     function getGraphData() {
        return graphData;
    }
     
     function getShowingMonth(){
    	 return showingMonth;
     }
     
     function toggleShowingMonth(){
    	 showingMonth = !showingMonth;
     }
     
     function getFoundData(){
    	 return foundData;
     }
     
     function getTableData(){
    	 return tableData;
     }
     
     function fetchData (qId, state, routeParams, year, month){
    	 foundData = true;
 		var graphParams = {};
 		graphParams.appId = routeParams.appId;
 		graphParams.modId = routeParams.modId;
 		graphParams.fnId = routeParams.fnId;
 		graphParams.qId = qId;
 		graphParams.state = state.stateCode.toLowerCase();
 		
 		
 		if(year)
 			graphParams.year = year;
 		
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
    	getShowingMonth: getShowingMonth,
    	toggleShowingMonth: toggleShowingMonth,
    	getFoundData : getFoundData,
    	getTableData : getTableData
    }

}]);



