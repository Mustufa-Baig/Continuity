const entriesRouter = require('express').Router()
const mongoose = require('mongoose')

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

entriesRouter.get('/stats/daily', userExtractor, async (request, response) => {
  try {
    const userId = new mongoose.Types.ObjectId(request.user)

    const previousDays = 35

    const stats = await Entry.aggregate([
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: new Date(Date.now() - previousDays * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    // Turn MongoDB results into a lookup object
    const statsMap = Object.fromEntries(
      stats.map(item => [item._id, item.count])
    )

    // Generate the last 20 days
    const result = []

    for (let i = previousDays; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      const dateString = date.toISOString().split('T')[0]

      result.push({
        date: dateString,
        count: statsMap[dateString] || 0
      })
    }

    response.json(result)

  } catch (error) {
    console.error(error)
    response.status(500).json({
      error: 'Failed to fetch entry stats'
    })
  }
})


module.exports = entriesRouter