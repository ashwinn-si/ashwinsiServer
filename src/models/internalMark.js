const mongoose = require("mongoose")

const internalMarkSchema = new mongoose.Schema({
  mark: String,
  nptel: String,
  bonus: String,
  m1Mark: Number,
  m2Mark: Number,
  m3Mark: Number
}, {
  timestamps: true
})

const internalMarkCalCountModel = mongoose.model("internalMark", internalMarkSchema)

module.exports = internalMarkCalCountModel