const express = require('express')
const exphns = require('express-handlebars')
const app = express()
const PORT = 3000
const Url = require('./models/Url')
const mongoose = require('mongoose')
const { abort } = require('process')
mongoose.connect('mongodb://localhost/url-shortener', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
  process.exit()
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('hbs', exphns({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))



let value = ''
app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const input = req.body.input
  let url_shortener = ''

  if (!input) {
    console.log('請輸入網址')
    res.redirect('/')
    return
  }
  Url.findOne({ url: input })
    .then(eachUrl => {
      if (eachUrl) {
        console.log('此網址已經申請過了')
        res.redirect('/')
        return
      }
      url_shortener = Math.random().toString(18).slice(-5)
      Url.findOne({ url_shortener })
        .then(eachUrlShort => {
          if (eachUrlShort) {
            url_shortener = Math.random().toString(18).slice(-6)
            Url.create({ url: input, url_shortener })
            return
          }
          Url.create({ url: input, url_shortener })
            .catch(err => console.log(err))
        })
        .then(() => {
          value = `http://localhost:3000/${url_shortener}`
          res.render('transfor', { url: value })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

app.get('/:shortUrl', (req, res) => {
  Url.findOne({ url_shortener: req.params.shortUrl })
    .then(url => {
      if (url) {
        res.redirect(url.url)
        return
      }
      console.log('沒有這個短網址')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})


app.listen(PORT, () => {
  console.log(`server is run in http://localhost:${PORT}`)
})