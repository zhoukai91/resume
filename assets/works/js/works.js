/*主模块*/
angular.module('myModule',['ngRoute','ngAnimate','myController'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/start',{
        templateUrl: 'assets/works/tpl/start.html',
        controller: 'startCtrl'
        })
        .otherwise({
          redirectTo: '/start'
        })
  }])
