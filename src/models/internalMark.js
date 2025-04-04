const mongoose = require("mongoose")

const internalMarkSchema = new mongoose.Schema({
    mark : "String"
},{
    timestamps : true
})

const internalMarkCalCountModel = mongoose.model("internalMark", internalMarkSchema)

module.exports = internalMarkCalCountModel