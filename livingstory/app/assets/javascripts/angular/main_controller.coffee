angular.module('story').controller('MainCtrl',['$scope', '$http', ($scope, $http)->
  $scope.hello = "World"
  $scope.sentences = []
  $scope.currentSentence = ''
  $scope.currentWord = ''

  $scope.$watch('storyText', (val)->
    if val
      if val[val.length - 1] == " "
        console.log("got space")
        werd = $scope.storyText.split(" ")[$scope.storyText.split(" ").length - 1]
        console.log("word:", werd)
        console.log($scope.storyText.split(" "))
      console.log($scope.sentences)
   )
])