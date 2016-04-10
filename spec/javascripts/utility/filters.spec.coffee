#= require angular-mocks
#= require angular/utility/module

describe 'Filters', ->
  filter = null

  beforeEach module 'utility'

  beforeEach inject ($filter) ->
    filter = $filter

  it 'camelToDash', ->
    camelToDash = filter 'camelToDash'
    expect(camelToDash 'abcDefGhi').toBe 'abc-def-ghi'

  it 'dashToCamel', ->
    dashToCamel = filter 'dashToCamel'
    expect(dashToCamel 'abc-def-ghi').toBe 'abcDefGhi'

  it 'chopped', ->
    chopped = filter 'chopped'
    expect(chopped 'abc.def.ghi.jkl').toBe 'jkl'

  it 'capitalized', ->
    capitalized = filter 'capitalized'
    expect(capitalized 'asdf').toBe 'Asdf'

  it 'removeNg', ->
    removeNg = filter 'removeNg'
    expect(removeNg 'ng-asdf').toBe 'asdf'
