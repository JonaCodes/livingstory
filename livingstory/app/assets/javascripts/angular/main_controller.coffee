angular.module('story').controller('MainCtrl',['$scope', '$http', ($scope, $http)->
  $scope.hello = "World"
  $scope.currentSentence = ''
  $scope.currentWord = ''
  images = ['http://www.kesha3d.com/Gallery/Painting/boy_and_dragon.jpg','http://www.kesha3d.com/Gallery/Amazonian_woman.jpg','http://www.kesha3d.com/Gallery/Tokime.jpg']
  $scope.images = images
  $scope.mainImg = ['http://www.kesha3d.com/Gallery/Amazonian_woman.jpg']

  $scope.sendWord = ->
    lastWord = $scope.storyText.split(" ")[$scope.storyText.split(" ").length - 1]
    json = {
      "latest": lastWord,
      "lastFour": $scope.storyText.split(" ")[0..3].join(' '),
      "relativeContext": $scope.currentSentence,
      "fullContext": $scope.storyText
    }
    console.log("json:", json)
    $http.post('/texts', {data: json}).then((res)->
        return if !res
        $scope.images.push('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR6VPj8X9Z9Lc6zSXQiyF3PRdxBrtyXf9hUslJqYVuQi7nxCuBc')
        $scope.mainImg = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR6VPj8X9Z9Lc6zSXQiyF3PRdxBrtyXf9hUslJqYVuQi7nxCuBc'
    )

  $scope.keyPressed = (keyEvent)->
    #enter pressed
    if keyEvent.which == 13
      $scope.sendWord()
      $scope.currentSentence = ''
    #whitespace pressed
    else if keyEvent.which == 32
      $scope.currentSentence += " "
      $scope.sendWord()
    else
      $scope.currentSentence += String.fromCharCode(keyEvent.which)
    console.log($scope.currentSentence)


])