var app = angular.module('story', ["ngRoute", 'monospaced.elastic','ngAnimate']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl : "main.html"
  })
});