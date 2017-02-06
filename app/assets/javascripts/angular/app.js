var app = angular.module('story', ["ngRoute", 'monospaced.elastic','ngAnimate','luegg.directives']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl : "main.html"
  })
});