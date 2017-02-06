'use strict';

/**
 * @ngdoc overview
 * @name storyFeApp
 * @description
 * # storyFeApp
 *
 * Main module of the application.
 */
angular
  .module('storyFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
