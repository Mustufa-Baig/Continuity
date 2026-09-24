const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const entriesRouter = require('./controllers/entries')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')))
  console.log('served React Frontend')
}

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })


app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/entries', entriesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)


module.exports = app