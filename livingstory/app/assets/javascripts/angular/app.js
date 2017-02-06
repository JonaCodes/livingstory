var app = angular.module('story', ["ngRoute"]);  

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
      templateUrl : "main.htm"
  })
});