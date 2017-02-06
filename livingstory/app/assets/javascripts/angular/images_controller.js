angular.module('story').controller('ImagesCtrl', function($scope) {
    
  $scope.addImg = function(){
    var next = $scope.images[Math.floor((Math.random() * 3))];
    $scope.images.push($scope.mainImg[0]);
    $scope.mainImg = [next];
  } 
});  