angular.module('story').controller('MainCtrl', function($scope) {
  var title = "Learn AngularJS";
  this.title = 'dfdffdfdf'
  $scope.title = title;
  $scope.getTitle = function() {
    return title;
  };
});  