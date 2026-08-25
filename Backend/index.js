require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.static(path.join(__dirname, '../Frontend/dist')))
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })


const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Entry = mongoose.model('Entry', entrySchema)

app.get('/api/entries', async (request, response) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 })

    response.json(entries)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to fetch entries' })
  }
})

app.post('/api/entries', async (request, response) => {
  try {
    const { title, content } = request.body

    const entry = new Entry({
      title,
      content,
    })

    const savedEntry = await entry.save()

    response.status(201).json(savedEntry)
  } catch (error) {
    console.error(error)
    response.status(400).json({ error: 'Failed to create entry' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
