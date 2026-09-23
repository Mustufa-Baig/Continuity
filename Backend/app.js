const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const entriesRouter = require('./controllers/entries')


app.use(express.static(path.join(__dirname, '../Frontend/dist')))

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })


app.use(express.json())

app.use('/api/entries', entriesRouter)

app.use(middleware.errorHandler)


module.exports = app