const entriesRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Entry = require('../models/entry')
const User = require('../models/user')

entriesRouter.get('/', userExtractor , async (request, response) => {
  try {
    const entries = await Entry.find({ user: request.user }).sort({ createdAt: -1 }).populate('user', { username: 1, name:1 })
    response.json(entries)

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to fetch entries' })
  }
})

entriesRouter.post('/', userExtractor , async (request, response, next) => {
  try {
    const { title, content } = request.body
    const user = await User.findById(request.user)
    
    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const entry = new Entry({
      title: title,
      content: content,
      user: user._id
    })

    const savedEntry = await entry.save()
    await savedEntry.populate('user', { username: 1, name:1 })

    user.entries = user.entries.concat(savedEntry.id)
    await user.save()

    response.status(201).json(savedEntry)
  } catch (error) { next(error) }
})

module.exports = entriesRouter