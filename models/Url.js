const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  url_shortener: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('urls', urlsSchema)