const express = require('express')
const exphns = require('express-handlebars')
const app = express()
const PORT = 3000


app.engine('hbs', exphns({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const url = req.body.url
  res.render('transfor', { url })
})


app.listen(PORT, () => {
  console.log(`server is run in http://localhost:${PORT}`)
})