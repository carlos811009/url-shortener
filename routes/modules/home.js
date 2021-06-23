const express = require('express')
const router = express.Router()
const Url = require('../../models/Url')
const generateShortUrl = require('./generateShortUrl')

let value = ''
const WEB_PATH = process.env.WEB_PATH
router.get('/:shortUrl', (req, res) => {
  if (req.params.shortUrl !== 'favicon.ico') {
    Url.findOne({ url_shortener: req.params.shortUrl })
      .then(url => {
        if (url) {
          res.redirect(url.url)
          return
        }
        res.redirect('/')
      })
      .catch(err => console.log(err))
  }
})

router.get('/', (req, res) => {
  res.render('index')
})
router.post('/', (req, res) => {
  const input = req.body.input
  let url_shortener = generateShortUrl()

  if (!input) {
    req.flash('warning_msg', '請輸入網址')
    res.redirect('/')
    return
  }
  Url.findOne({ url: input })
    .then(eachUrl => {
      if (eachUrl) {
        req.flash('warning_msg', '此網址已經申請過了')
        value = `${WEB_PATH}${eachUrl.url_shortener}`
        req.flash('message', value)
        res.redirect('/')
        return
      }
      Url.findOne({ url_shortener })
        .then(eachUrlShort => {
          url_shortener = generateShortUrl()
          while (eachUrlShort === url_shortener) {
            url_shortener = generateShortUrl()
          }
          Url.create({ url: input, url_shortener })
        })
        .then(() => {
          const success_msg = '轉換成功，可以複製網址了'
          value = `${WEB_PATH}${url_shortener}`
          res.render('transfor', { url: value, success_msg })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})



module.exports = router