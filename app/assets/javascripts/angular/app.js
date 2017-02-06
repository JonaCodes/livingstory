var app = angular.module('story', ["ngRoute", 'monospaced.elastic','ngAnimate']);

// app.config(function($routeProvider) {
//   $routeProvider
//   .when("/", {
//       templateUrl : "main.html"
//   })
// });
app.directive('imageonload', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('load', function() {
            $timeout(
              $(".scroller").scrollTop($(".scroller")[0].scrollHeight)
              ,3000);
        });
    }
  };
}]);