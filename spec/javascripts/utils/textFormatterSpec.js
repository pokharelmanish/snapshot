import {nWords, capitalizedStr, toCamelCase, toCapitalCase, cleanText} from 'utils/textFormatter'

describe('nWords', () => {
  const threeWords = 'word word word'

  describe('when the number of words is greater than n', () => {
    const fourWords = 'word word word word'
    it('returns n words followed by ...', () => {
      expect(nWords(fourWords, 3)).toEqual(
        `${threeWords}...`
      )
    })
  })

  describe('when the number of words is less than n', () => {
    const twoWords = 'word word'
    it('returns text provided', () => {
      expect(nWords(twoWords, 3)).toEqual(twoWords)
    })
  })

  describe('when the number of words is equal to n', () => {
    it('returns text provided', () => {
      expect(nWords(threeWords, 3)).toEqual(threeWords)
    })
  })

  it('returns null if the text is null', () => {
    expect(nWords(null, 1)).toEqual(null)
  })

  it('returns undefined if the text is undefined', () => {
    expect(nWords(undefined, 1)).toEqual(undefined)
  })
})

describe('capitalizedStr', () => {
  // the method assumes the string is already lower-cased
  it('capitalizes the first character of a string', () => {
    const str = 'text'
    expect(capitalizedStr(str)).toEqual('Text')
  })
})

describe('toCamelCase', () => {
  // this method assumes the string is already lower-cased
  it('camel-cases a string with dashes', () => {
    const str = 'camel-case-text'
    const seperator = /-/g
    expect(toCamelCase(str, seperator)).toEqual('camelCaseText')
  })

  it('camel-cases a string with periods', () => {
    const str = 'camel.case.text'
    const seperator = /\./g
    expect(toCamelCase(str, seperator)).toEqual('camelCaseText')
  })
})

describe('toCapitalCase', () => {
  // this method assumes the string is already lower-cased
  it('capital-cases a string with dashes', () => {
    const str = 'capital-case-text'
    const seperator = /-/g
    expect(toCapitalCase(str, seperator)).toEqual('CapitalCaseText')
  })

  it('capital-cases a string with equal signs', () => {
    const str = 'capital=case=text'
    const seperator = /=/g
    expect(toCapitalCase(str, seperator)).toEqual('CapitalCaseText')
  })
})

describe('cleanText', () => {
  it('strip html from text', () => {
    const str = '<em>my-clean-text'
    expect(cleanText(str)).toEqual('my-clean-text')
  })

  it('renders plain text as it is', () => {
    const str = 'test name'
    expect(cleanText(str)).toEqual('test name')
  })
})
