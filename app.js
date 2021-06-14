const express = require('express')
const exphns = require('express-handlebars')
const app = express()
const PORT = 3000
const router = require('./routes/index')


app.engine('hbs', exphns({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
require('./config/mongoose')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.use(router)



app.listen(PORT, () => {
  console.log(`server is run in http://localhost:${PORT}`)
})