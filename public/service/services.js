'use strict';

/* Services */

openFDA.factory('SharedDataSrvc', ['FetchOpenFDASrvc','$location','$anchorScroll',
function(FetchOpenFDASrvc, $location, $anchorScroll) {
	 var graphData;
	 var showingMonth = false;
	 var foundData = false;

	 
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
 					

 					console.log("Graph per Year Success:" + JSON.stringify(response));
 					
 					graphData = {};
 					graphData.state = state;
 					
 					if(year){
 						graphData.title = "Recalls for " + year + " per Month for " + state.stateName;						
 					}
 					else{
 						graphData.title = "Recalls per Year for " + state.stateName;
 						
 					}
 					
 					graphData.data = response.graph;
 					
 					 $location.hash('graphAnchor');

 				      $anchorScroll();		      
 					
 					
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
    	getFoundData : getFoundData
    }

}]);



