angular.module('myController', []).
	controller('parentCtrl', function($scope, $location){
		$scope.phone = '15573294740';
		$scope.jump = function(routeUrl){
			$location.path(routeUrl);
		}
	});
