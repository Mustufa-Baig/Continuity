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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
)

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry