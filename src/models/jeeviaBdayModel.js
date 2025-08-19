const mongoose = require("mongoose")

const jeeviaBdaySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const jeeviaBdayModel = mongoose.model("jeeviaBdayModel", jeeviaBdaySchema)

module.export = jeeviaBdayModel