angular.module('story').controller('MainCtrl',['$scope', '$http','$timeout', ($scope, $http, $timeout)->
  $scope.hello = "World"
  $scope.currentSentence = []
  $scope.currentWord = ''
  $scope.images = []
  $scope.mainImg = []
  $scope.lastWord = ''

  $scope.sendWord = ->
 
    json = {
      "latest": $scope.lastWord,
      "lastFour": $scope.currentSentence[0..3].join(' '),
      "relativeContext": $scope.currentSentence.join(' '),
      "fullContext": $scope.storyText
    }
    $http.post('/texts', {data: json}).then((res)->
        return if !res

#        for obj, index in $scope.images
#          if res.data[0].identifier.indexOf(obj.identifier) >=0 || res.data[1]?.identifier.indexOf(obj.identifier) >=0
#            deleted = $scope.images.splice(index, 1)
#            console.log("delete", deleted)

        for obj in res.data
          $scope.images.push(obj)

        $scope.mainImg = res.data[res.data.length - 1]


    )
  
  $scope.keyPressed = (keyEvent)->
    #enter pressed
    if keyEvent.which == 13
      $scope.currentSentence.push($scope.lastWord)
      $scope.sendWord()
      $scope.currentSentence = []
      $scope.lastWord = ''
    #backspace pressed
    else if keyEvent.which == 8
      $scope.lastWord = $scope.lastWord.slice(0, -1);
    #whitespace pressed
    else if keyEvent.which == 32
      $scope.currentSentence.push($scope.lastWord)
      $scope.sendWord()
      $scope.lastWord = ''
    else
      $scope.lastWord += String.fromCharCode(keyEvent.which)



])