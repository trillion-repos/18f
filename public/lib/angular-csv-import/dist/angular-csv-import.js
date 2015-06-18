/*! angular-csv-import - v0.0.15 - 2015-04-08
* Copyright (c) 2015 ; Licensed  */
'use strict';

var csvImport = angular.module('ngCsvImport', []);

csvImport.directive('ngCsvImport', function() {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		controller: 'SftpFormCtrl',
		scope:{
			clear:'=',
			header: '=',
			separator: '=',
			error: '=',
			result: '=',
			template: '='
		},
		template: '<div><label>File: &nbsp; </label><input id="uploadFile" placeholder="Choose File" disabled="disabled" /><div class="fileUpload btn btn-primary btn-sm"><span>Import File</span><input id="theFile" class="upload" accept=".csv" type="file"/></div></div>',
		link: function(scope, element) {
			scope.clear = function(){
				document.getElementById("uploadFile").value = "";
				}
			
			element.on('keyup', function(e){
				if ( scope.content != null ) {
					var content = {
						csv: scope.content,
						header: scope.header,
						separator: e.target.value
					};
					csvToJSON(content, scope.result);
					scope.$apply();
				}
			});

			element.on('change', function(onChangeEvent) {
				var fileName =document.getElementById("theFile").value;
				scope.error = [];
				
				if (fileName){
					var ext = fileName.split('.').pop().toLowerCase();
					
					if (ext != "csv"){
						scope.error.push("Only csv files allowed");
					}
				}
				
				document.getElementById("uploadFile").value = fileName;
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						var content = {
							csv: onLoadEvent.target.result.replace(/\r\n|\r/g,'\n'),
							header: scope.header,
							separator: scope.separator,
							error: scope.error,
							result: scope.result,
							template:scope.template
						};

						scope.content = content.csv;
						csvToJSON(content, scope.result, scope.error);
					});
				};
				if ( (onChangeEvent.target.type === "file") && (onChangeEvent.target.files != null || onChangeEvent.srcElement.files != null) )  {
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				} else {
					if ( scope.content != null ) {
						var content = {
							csv: scope.content,
							header: !scope.header,
							separator: scope.separator
						};
						scope.result = csvToJSON(content);
					}
				}
			});

			var csvToJSON = function(content, result, error) {
				
				var errorLines = [];
				if (content.error.length)
					return result;
				
				var lines=content.csv.split('\n');				
				var start = 0;

				if (content.header === true) {
					start = 1;
				}
				

				for (var i=start; i<lines.length; i++) {
					var obj = {fields:[]};
					var currentline=lines[i].split(new RegExp(content.separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
					
					if(currentline.length === 1 && currentline[0] === "")
						continue; // empty line
					
					if ( currentline.length === content.template.fields.length ) {

							for (var j=0; j< currentline.length; j++) {
								
								switch(content.template.fields[j].type){
								case "number": 
									content.template.fields[j].fieldValue = new Number(currentline[j]);
									break;
								case "date":
									content.template.fields[j].fieldValue = new Date(currentline[j]);
									break;
								default:	
									content.template.fields[j].fieldValue = currentline[j];
								}
							
							
								obj.fields.push(JSON.parse( JSON.stringify( content.template.fields[j] ) ));
							}
						obj.isImported = true;
						result.push(obj);
					}else{
						errorLines.push(i);
					}
					
				}	
				
				if(errorLines.length)
					error.push("Unable to read line(s): " + errorLines);

			};
		}
	};
});
