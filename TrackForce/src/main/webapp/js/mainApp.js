/**                                                     
 *	  *   )                    )  (                          
 *	` )  /( (       )       ( /(  )\ )       (           (   
 *	 ( )(_)))(   ( /(   (   )\())(()/(   (   )(    (    ))\  
 *	(_(_())(()\  )(_))  )\ ((_)\  /(_))  )\ (()\   )\  /((_) 
 *	|_   _| ((_)((_)_  ((_)| |(_)(_) _| ((_) ((_) ((_)(_))   
 *	  | |  | '_|/ _` |/ _| | / /  |  _|/ _ \| '_|/ _| / -_)  
 *	  |_|  |_|  \__,_|\__| |_\_\  |_|  \___/|_|  \__| \___| 
 * @namespace mainApp
 * @description Start the main module to be used for angular app
 */
var mainApp = angular.module('mainApp', [ 'ngRoute', 'chart.js' ]);
/**
 * @function config
 * @memberof mainApp
 * @param {service} routeprovider
 * @description Configure $routeProvider to create a Single Page Application
 */
mainApp.config(function($routeProvider) {
	$routeProvider
	
	// Home Page 
	.when("/", {
		templateUrl : "home.html",
		controller : "mainCtrl"
	})
	
	// Batch Listing Page
	.when("/batchListing", {
		templateUrl : "batchListing.html",
		controller : "batchCtrl"
	})
	
	// Batch Details Page
	.when("/batchDetails", {
		templateUrl : "batchDetails.html",
		controller : "batchCtrl"
	})
	
	// Associate List Page
	.when("/associateListing", {
		templateUrl : "associateListing.html",
		controller : "associateCtrl"
	})
	
	// Form Page
	.when("/form", {
		templateUrl : "form.html",
		controller : "associateCtrl"
	})
	
	// Client Details Page
	.when("/clientDetails", {
		templateUrl : "clientDetails.html",
		controller : "clientCtrl"
	})
	
	// Client Mapped Page
	.when("/clientMapped", {
		templateUrl : "clientMapped.html",
		controller : "clientMappedCtrl"
	})
	
	// Skillset Page
	.when("/skillset", {
		templateUrl : "skillset.html",
		controller : "clientCtrl"
	})
});
/**
 * @class mainApp.mainCtrl
 * @memberof mainApp
 * @description controller for the home page
 */
mainApp.controller("mainCtrl", function($scope, $http, $rootScope) {
		$http({
			method : 'GET',
			url : 'http://localhost:8080/TrackForce/track/info',
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function(response) {
						/**
						* @member {Array} UndeployedLabels
			 			* @memberof mainApp.mainCtrl
			 			* @description Undeployed chart shows mapped vs. unmapped 
			 			* excluding deployed associates. This array is used for the labels of the chart
			 			*/			
						$scope.UndeployedLabels = [ "Mapped","Unmapped" ];
						/**
						 * @member {Array} UndeployedData
						 * @memberof mainApp.mainCtrl
						 * @description UndeployedData is an array used to populate the 
						 * dataset of the Undeployed chart. The dataset contains two numbers:
						 * the mapped number is the sum of all mapped associates, the unmapped number
						 * is the sum of all unmapped associates.
						 */
						$scope.UndeployedData = [response.data.trainingMapped
								+ response.data.reservedMapped
								+ response.data.selectedMapped
								+ response.data.confirmedMapped,
								response.data.trainingUnmapped
								+ response.data.openUnmapped
								+ response.data.selectedUnmapped
								+ response.data.confirmedUnmapped ];
						 /**
						  * @member {Array} MappedLabels
						  * @memberof mainApp.mainCtrl
						  * @description Mapped chart shows undeployed mapped associates.
						  * This array is used to set the labels for the chart.
						  */
						$scope.MappedLabels = [ 'Training','Reserved', 'Selected','Confirmed' ];
						/**
						 * @member {Array} MappedData
						 * @memberof mainApp.mainCtrl
						 * @description MappedData is an array that stores the 
						 * data for the dataset of the Mapped chart.
						 * The dataset contains four numbers: training mapped<br>
						 * reserved mapped <br>
						 * selected mapped <br>
						 * confirmed mapped<br>
						 */
						$scope.MappedData = [response.data.trainingMapped,
											response.data.reservedMapped,
											response.data.selectedMapped,
											response.data.confirmedMapped ];
						/**
						  * @member {Array} UnmappedLabels
						  * @memberof mainApp.mainCtrl
						  * @description Unmapped chart shows undeployed unmapped associates.
						  * This array is used to set the labels for the chart.
						  */
						$scope.UnmappedLabels = [ 'Training','Open', 'Selected', 'Confirmed' ];
						/**
						 * @member {Array} UnmappedData
						 * @memberof mainApp.mainCtrl
						 * @description UnmappedData is an array that stores the 
						 * data for the dataset of the Unmapped chart.
						 * The dataset contains four numbers: training unmapped<br>
						 * open unmapped <br>
						 * selected unmapped <br>
						 * confirmed unmapped<br>
						 */
						$scope.UnmappedData = [response.data.trainingUnmapped,
												response.data.openUnmapped,
												response.data.selectedUnmapped,
												response.data.confirmedUnmapped ];
						/**
						* @member {Array} DeployedLabels
			 			* @memberof mainApp.mainCtrl
			 			* @description Deployed chart shows mapped vs. unmapped 
			 			* including only deployed associates. This array is used for the labels of the chart
			 			*/	
						$scope.DeployedLabels = [ 'Mapped','Unmapped' ];
						/**
						 * @member {Array} DeployedData
						 * @memberof mainApp.mainCtrl
						 * @description DeployedData is an array used to populate the 
						 * dataset of the Deployed chart. The dataset contains two numbers:
						 * the mapped number is the sum of all mapped associates, the unmapped number
						 * is the sum of all unmapped associates. Both numbers contain only deployed associates.
						 */
						$scope.DeployedData = [response.data.deployedMapped,
											response.data.deployedUnmapped ];
						// Optional styling arrays
						$scope.colors = [ '#e85410', '#59504c','#2d8799', '#6017a5' ];
						$scope.colors2 = [ '#17d339','#59504c', '#2d8799', '#e85410' ];
						$scope.options = {legend : {
										  display : true,
										  position : 'right'}};
						/**
						 * @function MappedOnClick
						 * @memberof mainApp.mainCtrl
						 * @description When the "Mapped" chart is clicked
						 * the global variable selectedStatus is
						 * set to the label of the slice
						 * clicked. The window then loads the
						 * clientMapped.html partial.
						 */
						$scope.MappedOnClick = function(points,evt) {
							console.log(points, evt);
							var clickedElementindex = points[0]["_index"];
							console.log($scope.MappedLabels[clickedElementindex]);
							$rootScope.selectedStatus = $scope.MappedLabels[clickedElementindex];
							window.location.href = "#!/clientMapped";
							};
							/**
							 * @function UnmappedOnClick
							 * @memberof mainApp.mainCtrl
							 * @description When the "Unmapped" chart is clicked
							 * the global variable selectedStatus is
							 * set to the label of the slice
							 * clicked. The window then loads the
							 * skillset.html partial.
							 */
						$scope.UnmappedOnClick = function(points, evt) {
							console.log(points, evt);
							var clickedElementindex = points[0]["_index"];
							console.log($scope.UnmappedLabels[clickedElementindex]);
							$rootScope.selectedStatus = $scope.UnmappedLabels[clickedElementindex];
							window.location.href = "#!/skillset";
							};
						});
				});
/**
 * @class mainApp.clientMappedCtrl
 * @memberof mainApp
 * @description controller for the Client Mapped page.
 */
mainApp.controller("clientMappedCtrl", function($scope, $http, $rootScope) {
	$http(
			{
				method : 'GET',
				/*
				 * This URL will pull varying data from the REST service based
				 * on the selectedStatus
				 */
				// TODO: update this URL with the REST service for pulling all
				// associates
				url : 'http://localhost:8080/TrackForce/track/mapped/'
						+ $rootScope.selectedStatus
			}).then(function(response) {
		/**
		 *  @member {Array} clients
		 *  @memberof mainApp.clientMappedCtrl
		 *  @description clients is a JSON array of clients mapped with their respective
		 *  numbers for the corresponding status. 
		 *  (Example: [{'name':Revature', 'count':'100'},{'name':'Another','count':'100'])
		 */
		var clients = response.data;
		/**
		 * @member {Array} clientMappedLabels
		 * @memberof mainApp.clientMappedCtrl
		 * @description clientMappedLabels is initialized as empty and then populated
		 * in a for loop that will add on each client name to the array. This array is then used
		 * to create the labels for the chart on the clientMapped.html page.
		 */
		$scope.clientMappedLabels = [];
		/**
		 * @member {Array} clientMappedData
		 * @memberof mainApp.clientMappedCtrl
		 * @description clientMappedData is initialized as empty and then populated 
		 * in a for loop that will add on each set of data corresponding to the label in the 
		 * clientMappedLabel array. This array is used to populate the dataset of the chart
		 * on the clientMapped.html page.
		 */
		$scope.clientMappedData = [];
		for (let i = 0; i < clients.length; i++) {
			/*
			 * TODO: These variable names may need to be changed according to the JSON
			 * (clients[].name and clients[].count)
			 */
			clientMappedLabels.push(clients[i].name);
			clientMappedData.push(clients[i].count);
		}
		$scope.options = {
			legend : {
				display : true,
				position : 'right'
			}
		}
		$scope.colors = [ '#e85410', '#59504c', '#2d8799', '#6017a5' ];
	});
});

//Controller for skillset.html
mainApp.controller("skillsetCtrl", function($scope, $rootScope, $http) {

	$http(
			{
				method : "GET",
				url : "http://localhost:8080/TrackForce/track/unmapped/"
						+ $rootScope.selectedStatus
			}).then(function(response) {
				
				var skillsets = response.data;
				$scope.skillsetLabels = [];
				$scope.skillsetData = [];
				for(let i = 0 ; i < skillsets.length; i++){
					skillsetLabels.push(skillsets[i].name);
					skillsetData.push(skillsets[i].count);
				}
				
				$scope.options = {
						legend : {
							display : true,
							position : 'right'
						}
					}
				$scope.colors = [ '#e85410', '#59504c', '#2d8799', '#6017a5' ];
	});
});
/**
 * @class mainApp.batchCtrl
 * @memberof mainApp
 * @description controller for the batch page
 */
mainApp.controller("batchCtrl", function($scope, $http) {
	
	$scope.batchDetails = false; 
	var currentTime = new Date().getTime();
	var threeMonthsAfter = currentTime + 7889238000;
	var threeMonthsBefore = currentTime - 7889238000;
	
	
	// Simple GET request example:
	$http({
		method : 'GET',
		url : 'http://localhost:8080/TrackForce/track/batches/' + threeMonthsBefore + '/' + threeMonthsAfter,
		headers : {'Content-Type' : 'application/json'}
	}).then(function successCallback(response) {
		$scope.batches = response.data;
		console.log($scope.batches);
	}, function errorCallback(response) {
		console.log('Error in doing http request')
	});
	
	$scope.getBatches = (function() {
		var fromdate = new Date($scope.fromdate);
		var todate = new Date($scope.todate);

		// Simple GET request example:
		$http({
			method : 'GET',
			url : 'http://localhost:8080/TrackForce/track/batches/' + fromdate.getTime() + '/' + todate.getTime(),
			headers : {'Content-Type' : 'application/json'}
		}).then(function successCallback(response) {
			$scope.batches = response.data;
			console.log($scope.batches);
		}, function errorCallback(response) {
			console.log('Error in doing http request')
		});
	});

	$scope.getCountPerBatchType = function() {
		// Simple GET request example:
		$http({
			method : 'GET',
			url : 'http://localhost:8080/TrackForce/track/batches/type'
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.amountType = response.data;
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$scope.amountType = {
				"JTA_SDET" : "2",
				".NET" : "3"
			}
		})
	};

		$scope.getMapStatusBatch = function(batchName) {
		// Simple GET request example:
		$http({
			method : 'GET',
			url : 'http://localhost:8080/TrackForce/track/batches/' 
				+ batchName + '/batchChart'
		}).then(function(response) {
			// this callback will be called asynchronously
			// when the response is available
			var batchMapStatus = response.data;
			console.log(response.data);
			$scope.labels = ['Mapped', 'Unmapped'];
			console.log($scope.labels);
			$scope.data = [batchMapStatus.Mapped, batchMapStatus.Unmapped];
			console.log($scope.data); 
			$scope.options = {
					scales : {
						yAxes : [ {
							ticks : {
								beginAtZero : true
							}
						} ]
					}
				};
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		})
	};
	$scope.getBatchAssociates = function(batchName) {
		// Simple GET request example:
		$http({
			method : 'GET',
			url : 'http://localhost:8080/TrackForce/track/batches/'
					+ batchName + '/associates'
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.associatesBatch = response.data;
			console.log(response.data); 
		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			$scope.assosicatesBatch = {
				"firstname" : "Raul",
				"lastname" : "Dummy-Data",
				"associateId" : "000"
			};
		})
	};
	
	$scope.showMapStatusAndAssociates = function(){
		return $scope.batchDetails = true; 
	};
	
});
/**
 * @class mainApp.clientCtrl
 * @memberof mainApp
 * @description This controller is used for generating charts for the client
 *              page
 */
mainApp.controller("clientCtrl", function($scope, $http) {
	/**
	 * @function getAllClientNames
	 * @memberof mainApp.clientCtrl
	 * @description This function will return a JavaScript object that contains
	 *              all of the client names and their id numbers
	 */
	$scope.getAllClientNames = function() {
		$http({
			method : "GET",
			url : "http://localhost:8080/TrackForce/track/clients"
		}).then(function(response) {
			$scope.clients = response.data;
			console.log(response.data);
		});
	}
	/**
	 * @function getAllClients
	 * @memberof mainApp.clientCtrl
	 * @description This function will create a chart for all of the clients
	 *              data <br>
	 *              Local Variables: <br>
	 *              clients <br>
	 *              clientName <br>
	 *              clientLabels <br>
	 *              clientSeries <br>
	 *              clientData <br>
	 *              clientColors <br>
	 *              clientOptions
	 */
	$scope.getAllClients = function() {
		$http({
			method : "GET",
			url : "http://localhost:8080/TrackForce/track/clients/info"
		}).then(function(response) {
			/**
			 * @member {Client} clients
			 * @description Local variable of getAllClients. A
			 *              JavaScript object is created from the client
			 *              object that is sent from the REST service.
			 *              This client object contains data from all
			 *              clients
			 */
			var clients = response.data;
			/**
			 * @member {String} clientName
			 * @description Local variable of getAllClients. This $scope
			 *              variable binds the data in the client name
			 *              to the header above the chart on the HTML
			 */
			$scope.clientName = clients.name;
			/**
			 * @member {Array} clientLabels
			 * @description Local variable of getAllClients. This will
			 *              bind an array of strings to the x-axis of
			 *              the bar chart
			 */
			$scope.clientLabels = [ 'Training', 'Reserved/Open',
					'Selected', 'Confirmed', 'Deployed' ];
			/**
			 * @member {Array} clientSeries
			 * @description Local variable of getAllClients. This array
			 *              describes the different bars you want to
			 *              display.
			 */
			$scope.clientSeries = [ 'Mapped', 'Unmapped' ];
			/**
			 * @member {Array} clientData
			 * @description Local variable of getAllClients. The clients
			 *              JavaScript object is used for the data it
			 *              contains which is then bound to the chart
			 *              dataset using the $scope service.
			 */
			$scope.clientData = [
					[ clients.trainingMapped, clients.reservedMapped,
							clients.selectedMapped,
							clients.confirmedMapped,
							clients.deployedMapped ],
					[ clients.trainingUnmapped, clients.openUnmapped,
							clients.selectedUnmapped,
							clients.confirmedUnmapped,
							clients.deployedUnmapped ] ];
			/**
			 * @property {Array} clientColors
			 * @description Local variable of getAllClients. This array
			 *              sets the color scheme for the chart.
			 */
			$scope.clientColors = [ {
				backgroundColor : '#e85410'
			}, {
				backgroundColor : '#59504c'
			}, '#e85410', '#e85410' ];
			/**
			 * @property {Array} clientOptions
			 * @description Local variable of getAllClients. This array
			 *              modifies the options of the chart.
			 */
			$scope.clientOptions = {
				legend : {
					display : true,
					position : 'right'
				},
			};
		});
	}
	/**
	 * @function getOneClient
	 * @memberof mainApp.clientCtrl
	 * @param {Integer}
	 *            searchValue The ID of the client you are searching for.
	 * @description This function will send a search value to the REST service
	 *              as a path parameter in order to find a single client. Once
	 *              the client object is received the graph should reflect the
	 *              changes. <br>
	 *              Local Variables: <br>
	 *              clients <br>
	 *              clientName <br>
	 *              clientLabels <br>
	 *              clientSeries <br>
	 *              clientData <br>
	 *              clientColors <br>
	 *              clientOptions
	 */
	$scope.getOneClient = function(searchValue) {
		$http({
			method : "GET",
			url : "http://localhost:8080/TrackForce/track/clients/"
					+ searchValue
		}).then(
		function(response) {
			var clients = response.data;
			$scope.clientName = clients.name;
			$scope.clientLabels = [ 'Training', 'Reserved/Open',
					'Selected', 'Confirmed', 'Deployed' ];
			$scope.clientSeries = [ 'Mapped', 'Unmapped' ];
			$scope.clientData = [
					[ clients.trainingMapped, clients.reservedMapped,
							clients.selectedMapped,
							clients.confirmedMapped,
							clients.deployedMapped ],
					[ clients.trainingUnmapped, clients.openUnmapped,
							clients.selectedUnmapped,
							clients.confirmedUnmapped,
							clients.deployedUnmapped ] ];
			$scope.clientOptions = {
				legend : {
					display : true,
					position : 'right'
				}
			};
		});
	}
});
/**
 * @class mainApp.databaseCtrl
 * @memberof mainApp
 * @description controller for database population and deletion.
 */
mainApp.controller('databaseCtrl', function($http, $scope) {
	/**
	 * @function populateDB
	 * @memberof mainApp.databaseCtrl
	 * @description Populates the database with information from
	 *              data script
	 */
	$scope.populateDB = function() {
		$http({
			method : "GET",
			url : "http://localhost:8080/TrackForce/track/database/populateDB"
		}).then(function(response) {
			$scope.dbMessage = response.data;
		})
	}
	/**
	 * @function deleteDB
	 * @memberof mainApp.databaseCtrl
	 * @description Truncates all the tables in the database
	 */
	$scope.deleteDB = function() {
		$http({
			method : "GET",
			url : "http://localhost:8080/TrackForce/track/database/deleteFromDB"
		}).then(function(response) {
			$scope.dbMessage = response.data;
		})
	}
	$scope.refresh = function() {
		window.location.reload();
	}
});

mainApp.controller('associateCtrl', function($http, $scope, $routeParams) {
	$http({
		method : "GET",
		url : "http://localhost:8080/TrackForce/track/associates/266"// + $routeParams.associateId
	}).then(function(response) {
		$scope.associateInfo = response.data;
	})
	
	$http({
		method : "GET",
		url : "http://localhost:8080/TrackForce/track/5" // + $routeParam.statusId
	}).then(function(response) {
		$scope.associates = response.data;
	})
});
