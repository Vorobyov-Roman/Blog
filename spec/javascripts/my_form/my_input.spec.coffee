#= require angular-mocks
#= require angular/my_form/module

describe 'my-input directive:', ->
  compile   = null
  rootScope = null

  beforeEach ->
    module 'myForm'

  beforeEach ->
    inject ($compile, $rootScope) ->
      compile   = $compile
      rootScope = $rootScope

  describe 'Restrictions:', ->
    it 'should require <form> as a parent element', ->
      expect -> compile('<my-input>')(rootScope)
      .toThrow()

      expect -> compile('<form><my-input></form>')(rootScope)
      .not.toThrow()

  describe 'HTML rendering', ->
    elem = null

    beforeEach ->
      html = """
        <form>
          <my-input>
        </form>
      """
      elem = compile(html)(rootScope).children()

    it 'should be rendered as a <div>', ->
      expect(elem.prop 'tagName').toBe 'DIV'

    it 'should have .form-group class', ->
      expect(elem.hasClass 'form-group').toBe true

    it 'should have <input> inside', ->
      input = elem.children()
      expect(input.prop 'tagName').toBe 'INPUT'

    it 'should have .form-control class on the inner <input> element', ->
      input = elem.children()
      expect(input.hasClass 'form-control').toBe true
    