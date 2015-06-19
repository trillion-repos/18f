openFDA.controller('DataMapCtrl', [ '$scope', 'MapOpenFDASrvc', '$routeParams',
		function($scope , MapOpenFDASrvc, $routeParams) {

	
	MapOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId},
			function success(response) {
				
				
				if(!response && !response.length){
					console.warn("No data found for MapId="+$routeParams);
					return;
				}
				

				console.log("Map Success:" + JSON.stringify(response));
				$scope.map.data = response;

				
				},
			function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));					
				
				$scope.error.push(errorResponse.data);
				});
	
	
	$scope.title = "Drug Recals Per State";
	$scope.map = {
			  scope: 'usa',
			  options: {
			    width: 1110,
			    legendHeight: 60 // optionally set the padding for the legend
			  },
			  geographyConfig: {
			    highlighBorderColor: '#EAA9A8',
			    highlighBorderWidth: 2
			  },
			  fills: {
			    'H': '#CC4731',
			    'M': '#306596',
			    'L': '#667FAF',
			    'defaultFill': '#DDDDDD'
			  },
/*			  data: {
			    "AZ": {
			      "fillkey": "M",
			    },
			    "CO": {
			      "fillkey": "H",
			    },
			    "DE": {
			      "fillkey": "L",
			    },
			    "GA": {
			      "fillkey": "M",
			    }
			  },*/
			  geographyConfig: {
		            popupTemplate: function(geo, data) {
		            	if(!data)
		            		return ['<div class="hoverinfo"><strong>',
			                        'No Known Recalls for ' + geo.properties.name
			                       ].join('');
		            	
		                return ['<div class="hoverinfo"><strong>',
		                        'Number of Recalls in ' + geo.properties.name,
		                        ': ' + data.count,
		                        '</strong></div>'].join('');
		            }
		        }
			}
			
			

		} ]);