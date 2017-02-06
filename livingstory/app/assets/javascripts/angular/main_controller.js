angular.module('story').controller('MainCtrl', function($scope) {
  var title = "Learn AngularJS";

  $scope.title = title;
  $scope.getTitle = function() {
    return title;
  };
});  