angular.module('story').controller('MainCtrl',['$scope', '$http','$timeout', ($scope, $http, $timeout)->
  $scope.hello = "World"
  $scope.currentSentence = ''
  $scope.currentWord = ''
  $scope.images = []
  $scope.mainImg = []

  $scope.sendWord = ->
    lastWord = $scope.storyText.split(" ")[$scope.storyText.split(" ").length - 1]
    json = {
      "latest": lastWord,
      "lastFour": $scope.storyText.split(" ")[0..3].join(' '),
      "relativeContext": $scope.currentSentence,
      "fullContext": $scope.storyText
    }
    $http.post('/texts', {data: json}).then((res)->
        return if !res
        $scope.images.push(res.data)
        $scope.mainImg = [res.data]
        $scope.scrolldown()
    )

  $scope.scrolldown = () ->
    
    $timeout(
      $(".scroller").scrollTop($(".scroller")[0].scrollHeight)
      console.log 'here' 
      , 3000)

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