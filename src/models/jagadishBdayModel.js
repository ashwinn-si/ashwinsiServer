const mongoose = require("mongoose")

const jagadishBdaySchema = new mongoose.Schema({
  page: {
    type: String,
    default: 0
  },
  attempts: {
    type: String,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const jagadishBdayModel = mongoose.model("jagadishBdayModel", jagadishBdaySchema)

module.exports = jagadishBdayModel