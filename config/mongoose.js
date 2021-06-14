const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/url-shortener', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
  process.exit()
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db