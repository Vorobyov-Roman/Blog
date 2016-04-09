#= require angular-mocks
#= require angular/my_form/module
#= require angular/utility/module

describe 'my-input directive:', ->
  compile   = null
  rootScope = null
  filter    = null

  beforeEach ->
    module 'myForm'
    module 'utility'

  beforeEach ->
    inject ($compile, $rootScope, $filter) ->
      compile   = $compile
      rootScope = $rootScope
      filter    = $filter

  describe 'Restrictions', ->
    it 'should require <form> as a parent element', ->
      expect -> compile('<my-input></my-input>')(rootScope)
      .toThrow()

      expect -> compile('<form><my-input></my-input></form>')(rootScope)
      .not.toThrow()

  describe 'HTML rendering', ->
    elem = null
    form = null

    beforeEach ->
      form = angular.element """
        <form>
          <my-input>
            <validation ng-minlength="3" ng-maxlength="5">asd</validation>
            <validation required>123</validation>
          </my-input>
        </form>
      """
      elem = compile(angular.copy form)(rootScope).children()

    it 'should be rendered as a div.form-group element', ->
      expect(elem.prop 'tagName').toBe 'DIV'
      expect(elem.hasClass 'form-group').toBe true      

    it 'should have input.form-control element inside', ->
      expect(elem.children('input.form-control').length).not.toBe 0

    it 'should have error element for each provided validation', ->
      expect(elem.children('div.collapse').length).not.toBe 0
      expect(elem.children('div.collapse').children().length).toBe 2

      messages = form.children().children().map -> $(this).text()
      elem.children('div.collapse').children().each (i) ->
        expect($(this).text()).toBe messages[i]

  describe 'Attribute handling', ->
    form = null
    input = null

    beforeEach ->
      form = angular.element """
        <form>
          <my-input a="1" b="2">
            <validation ng-minlength="3" ng-maxlength="5">asd</validation>
            <validation required>123</validation>
          </my-input>
        </form>
      """
      input = compile(form)(rootScope).children().children()

    it 'should move attributes to the inner <input> element', ->
      expect(input.attr 'a').toBe '1'
      expect(input.attr 'b').toBe '2'

    it 'should add validators to the inner <input> element', ->
      expect(input.attr 'ng-minlength').toBe '3'
      expect(input.attr 'ng-maxlength').toBe '5'
      expect(input.attr 'required').toBe 'required'

    describe 'Attribute deduction', ->
      form = null
      chopped = null

      beforeEach ->
        chopped = filter 'chopped'
        form = compile("""
          <form>
            <my-input ng-model="abc.def.ghi"></my-input>
            <my-input ng-model="abc.def.email"></my-input>
            <my-input ng-model="abc.def.password"></my-input>
          </form>
        """)(rootScope.$new())

      it 'should deduct "name" attribute from "ng-model" value', ->
        form.children().each ->
          input = $(this).children()
          expect(input.attr 'name').toBe chopped input.attr 'ng-model'

      it 'should deduct "placeholder" attribute from "ng-model" value', ->
        capitalized = filter 'capitalized'

        form.children().each ->
          input = $(this).children()
          expect(input.attr 'placeholder').toBe capitalized chopped input.attr 'ng-model'

      it 'should deduct "type" attribute from "ng-model" value', ->
        form.children().each ->
          input = $(this).children()
          expectedType = if chopped(input.attr 'ng-model') == 'password' then 'password' else 'text'
          expect(input.attr 'type').toBe expectedType
