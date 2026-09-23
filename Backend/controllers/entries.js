const entriesRouter = require('express').Router()
const Entry = require('../models/entry')

entriesRouter.get('/', async (request, response) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 })

    response.json(entries)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to fetch entries' })
  }
})

entriesRouter.post('/', async (request, response, next) => {
  try {
    const { title, content } = request.body

    const entry = new Entry({
      title,
      content,
    })

    const savedEntry = await entry.save()

    response.status(201).json(savedEntry)
  } catch (error) { next(error) }
})

module.exports = entriesRouter