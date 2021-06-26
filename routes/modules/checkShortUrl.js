const { models } = require("mongoose")
const Url = require('../../models/Url')
function checkShortUrl(res, url_shortener, input, WEB_PATH) {
  return new Promise((resolve, reject) => {
    Url.findOne({ url_shortener })
      .then(other => {
        if (!other) {
          Url.create({ url: input, url_shortener })
            .then(() => {
              const success_msg = '轉換成功，可以複製網址了'
              value = `${WEB_PATH}${url_shortener}`
              resolve(res.render('transfor', { url: value, success_msg }))
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  })

}
module.exports = checkShortUrl