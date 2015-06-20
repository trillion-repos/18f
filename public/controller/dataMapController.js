openFDA.controller('DataMapCtrl', [ '$scope', 'FetchOpenFDASrvc', '$routeParams',
		function($scope , FetchOpenFDASrvc, $routeParams) {

	
	FetchOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId, qId:"mapRps"},
			function success(response) {
				
				
				if(!response){
					console.warn("No data found for MapId="+$routeParams);
					return;
				}
				

				console.log("Map Success:" + JSON.stringify(response));
				$scope.map.data = response.mapData;
				$scope.orderedData = response.orderedData.slice(0,10);
				$scope.title = response.mapDataTitle;
				
				},
			function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));					
				
				$scope.error.push(errorResponse.data);
				});
	
	$scope.map = {
			  scope: 'usa',
			  options: {
				  staticGeoData: true,
				  labels: true,
				  labelSize: 10,
			    width: 900,
			    legendHeight: 60 // optionally set the padding for the legend
			  },
			  geographyConfig: {
			    highlighBorderColor: '#EAA9A8',
			    highlighBorderWidth: 2
			  },
			  fills: {
				"VH":'#2a4644',
			    "H": '#558C89',
			    "M": '#74AFAD',
			    "L": '#D5E7E6',
			    'defaultFill': '#ECECEA'
			  },
			  data: {},
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
			
	
	$scope.mapPlugins = {
			  bubbles: null,
			  customLegend: function(layer, data, options) {
			    var html = ['<ul class="list-inline" style="padding-left:40px">'],
			        label = '';
			    for (var fillKey in this.options.fills) {
			    	switch (true) {
			    	case fillKey === "VH": label = ">400"; break;
					case fillKey === "H": label = ">300";  break;
					case fillKey === "M": label = ">200";  break;
					case fillKey === "L": label = ">0 &nbsp;&nbsp;&nbsp;"; 	break;
					case fillKey === "defaultFill" : label = "unknown"; break;
					default:
						break;
					}
			      html.push('<li class="key" ',
			                  'style="border-top: 10px solid ' + this.options.fills[fillKey] + '">',
			                  label,
			                  '</li>');
			    }
			    html.push('</ul>');
			    d3.select(this.options.element).append('div')
			      .attr('class', 'datamaps-legend')
			      .html(html.join(''));
			  }
			};
			
	$scope.mapPluginData = { bubbles: [{}]};
	
	
	
	//GRAPH
	
	$scope.drillDownToYear = function(geography){
		var stateName = geography.properties.name;
		var stateCode = geography.id;
		console.log(stateName + " : " +  stateCode);
		
		FetchOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId, qId:"graphRpy"},
				function success(response) {
					
					
					if(!response){
						console.warn("No data found for graph="+$routeParams);
						return;
					}
					

					console.log("Graph per Year Success:" + JSON.stringify(response));
					
					
					},
				function error(errorResponse) {
					console.log("Error:" + JSON.stringify(errorResponse));				
					$scope.error.push(errorResponse.data);
					});
	};

		} ]);