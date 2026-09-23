const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 2,
      required: true,
    },
    content: {
      type: String,
      minLength: 2,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry