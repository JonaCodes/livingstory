angular.module('story').controller('MainCtrl',['$scope', '$http','$timeout', ($scope, $http, $timeout)->
  $scope.hello = "World"
  $scope.currentSentence = ''
  $scope.currentWord = ''
  $scope.images = []
  $scope.mainImg = []

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
    $http.post('/texts', {data: json}).then((res)->
        return if !res
        $scope.images.push(res.data)
        $scope.mainImg = [res.data]
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