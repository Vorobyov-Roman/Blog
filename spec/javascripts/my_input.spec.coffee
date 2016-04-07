#= require angular/my_form/module
#= require angular-mocks

describe 'Directive: my-input', ->
  compile = null
  rootScope = null

  createElement = (html, scope = rootScope) ->
    element = compile("<form>#{html}</form>")(scope)
    scope.$digest()
    element.children()

  beforeEach module('myForm')

  beforeEach inject ($compile, $rootScope) ->
    compile = $compile
    rootScope = $rootScope

####################################################################################################

  it 'should render HTML properly', ->
    formGroup = createElement '<my-input>'

    expect(formGroup.length).toEqual 1
    expect(formGroup.hasClass 'form-group').toEqual true

    input = formGroup.children()

    expect(input.length).toEqual 1
    expect(input.hasClass 'form-control').toEqual true

####################################################################################################

  it 'should transfer attributes to the underlying input element', ->
    formGroup = createElement '<my-input name="username" ng-model="abcd" type="text">'

    input = formGroup.children()

    expect(input.attr 'name').toEqual 'username'
    expect(input.attr 'ng-model').toEqual 'abcd'
    expect(input.attr 'type').toEqual 'text'

####################################################################################################

  it 'should generate the name attribute from ng-model value if one is not supplied', ->
    formGroup = createElement '<my-input ng-model="ctrl.asd">'
    expect(formGroup.children().attr 'name').toEqual 'asd'

    formGroup = createElement '<my-input ng-model="ctrl.asd.username">'
    expect(formGroup.children().attr 'name').toEqual 'username'

    formGroup = createElement '<my-input ng-model="ctrl.asd.asd.password">'
    expect(formGroup.children().attr 'name').toEqual 'password'

####################################################################################################

  it 'should generate the placeholder attribute from ng-model value if one is not supplied', ->
    formGroup = createElement '<my-input ng-model="ctrl.asd">'
    expect(formGroup.children().attr 'placeholder').toEqual 'Asd'

    formGroup = createElement '<my-input ng-model="ctrl.asd.username">'
    expect(formGroup.children().attr 'placeholder').toEqual 'Username'

    formGroup = createElement '<my-input ng-model="ctrl.asd.asd.password">'
    expect(formGroup.children().attr 'placeholder').toEqual 'Password'

####################################################################################################

  it 'should generate the type attribute from ng-model value if one is not supplied', ->
    formGroup = createElement '<my-input ng-model="ctrl.asd">'
    expect(formGroup.children().attr 'type').toEqual 'text'

    formGroup = createElement '<my-input ng-model="ctrl.asd.username">'
    expect(formGroup.children().attr 'type').toEqual 'text'

    formGroup = createElement '<my-input ng-model="ctrl.asd.asd.password">'
    expect(formGroup.children().attr 'type').toEqual 'password'
