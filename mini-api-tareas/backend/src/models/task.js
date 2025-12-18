const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      maxlength: [100, 'El título no puede exceder 100 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      filename: String,
      path: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
)


taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

taskSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() })
  next()
})

module.exports = mongoose.model('Task', taskSchema)
