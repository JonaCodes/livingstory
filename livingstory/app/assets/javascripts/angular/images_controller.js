angular.module('story').controller('ImagesCtrl', function($scope) {
    
  images = ['http://www.kesha3d.com/Gallery/Painting/boy_and_dragon.jpg','http://www.kesha3d.com/Gallery/Amazonian_woman.jpg','http://www.kesha3d.com/Gallery/Tokime.jpg']  
  $scope.images = images;

  $scope.mainImg = ['http://www.kesha3d.com/Gallery/Amazonian_woman.jpg']
  
  $scope.addImg = function(){
    var next = $scope.images[Math.floor((Math.random() * 3))];
    $scope.images.push($scope.mainImg[0]);
    $scope.mainImg = [next];
  } 
});  