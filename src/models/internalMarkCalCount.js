const mongoose = require("mongoose")

const internalMarkCalCountSchema = new mongoose.Schema({
    text : "String"
},{
    timestamps : true
})

const internalMarkCalCountModel = mongoose.model("internalMarkCalCount", internalMarkCalCountSchema)

module.exports = internalMarkCalCountModel
