var app = angular.module('story', ["ngRoute", 'monospaced.elastic']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl : "main.html"
  })
});