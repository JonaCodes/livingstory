'use strict'

describe 'Controller: UserCtrl', ->

  # load the controller's module
  beforeEach module 'storyFeApp'

  UserCtrl = {}

  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    UserCtrl = $controller 'UserCtrl', {
      # place here mocked dependencies
    }

  it 'should attach a list of awesomeThings to the scope', ->
    expect(UserCtrl.awesomeThings.length).toBe 3
