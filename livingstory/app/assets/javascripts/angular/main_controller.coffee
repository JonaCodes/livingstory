angular.module('story').controller('MainCtrl',['$scope', '$http', ($scope, $http)->
  $scope.hello = "World"
  $scope.currentSentence = ''
  $scope.currentWord = ''

  $scope.sendWord = ->
    lastWord = $scope.storyText.split(" ")[$scope.storyText.split(" ").length - 1]
    json = {
      "latest": lastWord,
      "lastFour": $scope.storyText.split(" ")[0..3],
      "relativeContext": $scope.currentSentence,
      "fullContext": $scope.storyText
    }
    console.log("json:", json)
    $http.post('/texts', {data: json})

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