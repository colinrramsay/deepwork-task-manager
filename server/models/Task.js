const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  day: {
    type: String,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Task', TaskSchema)