angular.module('woele', ['ng', 'ngRoute', 'ngAnimate']).
  controller('parentCtrl', function($scope, $location){
    $scope.phone = '15573294740';
    $scope.jump = function(routeUrl){
      $location.path(routeUrl);
    }
  }).
  controller('startCtrl', function ($scope,$interval) {
  	$scope.enterTime = 3;
  	stop = $interval(function(){
  		$scope.enterTime--;
  		if(!$scope.enterTime){
  			$scope.jump('/main');
  			$interval.cancel(stop);
  			stop = null;
  		}
  	},1000)
  }).
  controller('mainCtrl', function ($scope,$rootScope,$http) {
    $scope.hasMore = true;  //是否还有更多数据可供加载
    $scope.showList = [];   //用于保存正在显示的菜品的数组
    //控制器初始化/页面加载时，从服务器读取最前面的5条记录
    $http.get('data/dish_list.json').
      success(function(data){
        $rootScope.dishList = data; //用于保存所有菜品数据的数组
        $scope.showList = $scope.dishList.slice(0,5);
      });
    //“加载更多”按钮的单击事件处理函数：每点击一次，加载更多的5条数据
    $scope.loadMore = function(){
          $scope.hasMore = false;
          $scope.showList = $scope.dishList;
    };
  }).
  controller('detailCtrl', function ($scope, $rootScope ,$routeParams) {
        $scope.dish =  $rootScope.dishList[$routeParams.did];
  }).
  controller('orderCtrl', function($rootScope, $scope,$routeParams,$http){
    //$routeParams.did
    $scope.order = {};
    $scope.order.did = $routeParams.did;
    $scope.order.phone = '15573294740';
    $scope.order.sex = '1';
    $scope.order.user_name = '周凯';
    $scope.order.addr = '琴湖10栋';
    $scope.result = null;

    $scope.submitOrder = function(){
      $scope.result = {};
      $scope.result.msg = 'succ';
      $scope.result.did = 4;
    }
  }).
  controller('myorderCtrl',function($scope,$http){
      $http.get('data/orde_list.json').success(function(data){
        $scope.orderList = data;
      });
  }).
  config(function ($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: './assets/works/woele/tpl/start.html',
        controller: 'startCtrl'
      }).
      when('/main', {
        templateUrl: 'tpl/main.html',
        controller: 'mainCtrl'
      }).
      when('/detail/:did', {
        templateUrl: 'tpl/detail.html',
        controller: 'detailCtrl'
      }).
      when('/order/:did', {
        templateUrl: 'tpl/order.html',
        controller: 'orderCtrl'
      }).
      when('/myorder',{
        templateUrl: 'tpl/myorder.html',
        controller: 'myorderCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      })
  }).
  run(function($http){
    //设置$http.post请求的默认请求消息头部
    $http.defaults.headers.post = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
