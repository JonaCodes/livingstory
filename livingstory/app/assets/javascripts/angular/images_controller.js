angular.module('story').controller('ImagesCtrl', function($scope) {
    
  images = ['http://www.kesha3d.com/Gallery/Painting/boy_and_dragon.jpg','http://www.kesha3d.com/Gallery/Amazonian_woman.jpg','http://www.kesha3d.com/Gallery/Tokime.jpg']  
  $scope.images = images;

  $scope.mainImg = 'http://www.kesha3d.com/Gallery/Amazonian_woman.jpg'
});  