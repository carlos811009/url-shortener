const express = require('express')
const session = require('express-session')
const exphns = require('express-handlebars')
const app = express()
const router = require('./routes/index')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
app.engine('hbs', exphns({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
require('./config/mongoose')

app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.message = req.flash('message')
  next()
})


app.use(router)



app.listen(PORT, () => {
  console.log(`server is run in http://localhost:${PORT}`)
})