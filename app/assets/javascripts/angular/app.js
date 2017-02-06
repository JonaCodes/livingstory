var app = angular.module('story', ["ngRoute", 'monospaced.elastic','ngAnimate']);

// app.config(function($routeProvider) {
//   $routeProvider
//   .when("/", {
//       templateUrl : "main.html"
//   })
// });
app.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('load', function() {
            $timeout(
              $(".scroller").scrollTop($(".scroller")[0].scrollHeight)
              console.log 'here' 
            , 3000)
        });
        element.bind('error', function(){
             
        });
    }
  };
});