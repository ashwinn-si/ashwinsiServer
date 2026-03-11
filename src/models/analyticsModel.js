const mongoose = require("mongoose")
const analyticsSchema = new mongoose.Schema({
  createdAt: {
    default: Date.now()
  },
  website: {
    type: String,
  },
  trafficType: {
    type: String,
    enum: ["normal", "portfolio", "linkdin"]
  }
})

const analyticModel = mongoose.model("analytics", analyticsSchema);

module.exports = analyticModel;