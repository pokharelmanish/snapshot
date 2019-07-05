export const nWords = (text, numberOfWords) => {
  const delimited = text && text.split(' ')
  if (text && delimited.length > numberOfWords) {
    return delimited
      .slice(0, numberOfWords)
      .join(' ')
      .concat('...')
  } else {
    return text
  }
}

// this method assumes the string is already lower-cased
export const capitalizedStr = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

// this method assumes the string is already lower-cased
export const toCamelCase = (str, seperator) => {
  const subStrArray = str.split(seperator)
  const downCaseFirstSubStr = subStrArray[0].toLowerCase()
  const subStringsAfterFirst = subStrArray.slice(1)
  const capitalizedSubStrings = subStringsAfterFirst.map(substr => capitalizedStr(substr))
  return `${downCaseFirstSubStr}${capitalizedSubStrings.join('')}`
}

// this method assumes the string is already lower-cased
export const toCapitalCase = (str, seperator) => str
  .split(seperator)
  .map(substr => capitalizedStr(substr))
  .join('')

export const removeHtmlTags = (myString) =>
  myString.replace(/<[^>]*>?/gm, '')
