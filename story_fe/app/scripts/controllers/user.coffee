'use strict'

###*
 # @ngdoc function
 # @name storyFeApp.controller:UserCtrl
 # @description
 # # UserCtrl
 # Controller of the storyFeApp
###
angular.module 'storyFeApp'
  .controller 'UserCtrl', ->
    @awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
    return