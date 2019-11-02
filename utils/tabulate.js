const wordWidth = require('word-width')

const alignWithSpace = (item, len) => {
  const str = String(item)
  const asciiLen = wordWidth(str)
  if(asciiLen > len) return str
  return str + Array(len - asciiLen).fill('').join(' ')
}
module.exports = tabulate = arr => {
  return arr.reduce((acc, item) => {
    return acc + alignWithSpace(item, 12) + '|'
  }, '|')
}