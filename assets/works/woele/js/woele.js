/*“我饿了”的主模块*/
angular.module('work', ['ng', 'ngRoute', 'ngAnimate','myController']).
config(function ($routeProvider) {
  $routeProvider.
  when('/start', {
    templateUrl: './woele/tpl/start.html',
    controller: 'startCtrl'
  }).
  when('/main', {
    templateUrl: './woele/tpl/main.html',
    controller: 'mainCtrl'
  }).
  when('/detail/:did', {
    templateUrl: './woele/tpl/detail.html',
    controller: 'detailCtrl'
  }).
  when('/order/:did', {
    templateUrl: './woele/tpl/order.html',
    controller: 'orderCtrl'
  }).
  when('/myorder',{
    templateUrl: './woele/tpl/myorder.html',
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
});

/*
 (function () {
 var s = document.createElement("script");
 s.onload = function () {
 bootlint.showLintReportForCurrentDocument([]);
 };
 s.src = "./assets/plug-in/bootstrap/js/bootlint.min.js";
 document.body.appendChild(s)
 })();*/

