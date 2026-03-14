const mongoose = require("mongoose")

const internalMarkSchema = new mongoose.Schema({
  mark: String,
  nptel: String,
  bonus: String,
  category: {
    type: String,
    enum: ["HOPE Elite", "PEP", "General"],
    default: "General"
  },
  pt1: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  pt2: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  pt3: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  m1Mark: Number,
  m2Mark: Number,
  m3Mark: Number
}, {
  timestamps: true
})

const internalMarkCalCountModel = mongoose.model("internalMark", internalMarkSchema)

module.exports = internalMarkCalCountModel