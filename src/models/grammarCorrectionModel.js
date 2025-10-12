const mongoose = require("mongoose")

const grammarSchema = new mongoose.Schema({
  originalText: {
    type: String
  },
  resultText: {
    type: String,
    default: ""
  },
  jonner: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const grammarModel = mongoose.Model("grammar-application", grammarSchema)

module.export = grammarModel;