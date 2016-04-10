#= require angular-mocks
#= require angular/my_form/module

describe 'valid-characters directive', ->
  scope = null
  form  = null

  beforeEach module 'myForm'

  beforeEach inject ($compile, $rootScope) ->
    scope = $rootScope.$new()
    scope.data =
      value: null

    element = angular.element """
      <form name="form">
        <input name="input" ng-model="data.value" valid-characters="a-zA-Z0-9-_" />
      </form>
    """
    $compile(element) scope
    scope.$digest()

    form = scope.form

  it 'should accept letters', ->
    charset = 'abcdefghijklmnopqrstuvwxyz'

    form.input.$setViewValue charset
    expect(scope.data.value).toBe charset
    expect(form.input.$valid).toBe true

    form.input.$setViewValue charset.toUpperCase()
    expect(scope.data.value).toBe charset.toUpperCase()
    expect(form.input.$valid).toBe true

  it 'should accept numbers', ->
    charset = '0123456789'
    
    form.input.$setViewValue charset
    expect(scope.data.value).toBe charset
    expect(form.input.$valid).toBe true

  it 'should accept dashes', ->
    form.input.$setViewValue '---'
    expect(scope.data.value).toBe '---'
    expect(form.input.$valid).toBe true

  it 'should accept underscores', ->
    form.input.$setViewValue '___'
    expect(scope.data.value).toBe '___'
    expect(form.input.$valid).toBe true

  it 'should not accept anything else', ->
    form.input.$setViewValue '.#@%'
    expect(scope.data.value).toBe undefined
    expect(form.input.$valid).toBe false
