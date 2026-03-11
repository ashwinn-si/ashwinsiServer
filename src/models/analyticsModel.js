const mongoose = require("mongoose")
const analyticsSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String,
  },
  trafficType: {
    type: String,
    enum: ["normal", "portfolio", "linkedin"]
  }
})

const analyticModel = mongoose.model("analytics", analyticsSchema);

module.exports = analyticModel;