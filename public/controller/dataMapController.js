openFDA.controller('DataMapCtrl', [ '$scope', 'MapOpenFDASrvc', '$routeParams',
		function($scope , MapOpenFDASrvc, $routeParams) {

	
	MapOpenFDASrvc.get({appId:$routeParams.appId, modId: $routeParams.modId, fnId:$routeParams.fnId},
			function success(response) {
				
				
				if(!response){
					console.warn("No data found for MapId="+$routeParams);
					return;
				}
				

				console.log("Map Success:" + JSON.stringify(response));
				$scope.map.data = response.mapData;
				$scope.orderedData = response.orderedData.slice(0,10);

				
				},
			function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));					
				
				$scope.error.push(errorResponse.data);
				});
	
	
	$scope.title = "Drug Recals Per State";
	
	$scope.map = {
			  scope: 'usa',
			  options: {
				  staticGeoData: true,
			    width: 900,
			    legendHeight: 60 // optionally set the padding for the legend
			  },
			  geographyConfig: {
			    highlighBorderColor: '#EAA9A8',
			    highlighBorderWidth: 2
			  },
			  fills: {
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
					case fillKey === "H": label = ">300";			break;
					case fillKey === "M": label = ">200"; 		break;
					case fillKey === "L": label = ">0 &nbsp;&nbsp;&nbsp;"; 		break;
					case fillKey === "defaultFill" : label = "0&nbsp;&nbsp;&nbsp;&nbsp;"; break;
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
			
	$scope.mapPluginData = {
			  bubbles: [{}]
			};

		} ]);