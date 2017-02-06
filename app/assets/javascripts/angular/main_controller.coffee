angular.module('story').controller('MainCtrl',['$scope', '$http', ($scope, $http)->
  $scope.hello = "World"
  $scope.currentSentence = ''
  $scope.currentWord = ''
  images = ['http://www.kesha3d.com/Gallery/Painting/boy_and_dragon.jpg','http://www.kesha3d.com/Gallery/Amazonian_woman.jpg','http://www.kesha3d.com/Gallery/Tokime.jpg']
  $scope.images = images
  $scope.mainImg = ['http://www.kesha3d.com/Gallery/Amazonian_woman.jpg']

  $scope.sendWord = ->
    console.log("in send word")
    lastWord = $scope.currentSentence.split(" ")[$scope.currentSentence.split(" ").length - 1]
    console.log("lastWord is:", lastWord)
    json = {
      "latest": lastWord,
      "lastFour": $scope.currentSentence.split(" ")[0..3].join(' '),
      "relativeContext": $scope.currentSentence,
      "fullContext": $scope.storyText
    }
    console.log("json:", json)
    $http.post('/texts', {data: json}).then((res)->
        console.log("Wtf", res)
        return if !res
        $scope.images.push(res.data)
        $scope.mainImg = res.data
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