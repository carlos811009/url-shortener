function getShortUrl() {
  const shortUrlLength = 5
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const upperLetters = letters.toUpperCase()
  const number = '1234567890'
  const data = letters + upperLetters + number
  let shortUrl = ''
  for (i = 0; i < shortUrlLength; i++) {
    const length = data.length + 1
    let index = Math.floor(Math.random() * length)
    if (index === data.length) {
      index--
      shortUrl += data.slice(index, index + 1)
    } else {
      shortUrl += data.slice(index, index + 1)
    }
  }
  return shortUrl
}

module.exports = getShortUrl