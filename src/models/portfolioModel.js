const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    ip : "String",

},{
    timestamps : true
})

const portfolioModel = mongoose.model("portfolio", portfolioSchema)

module.exports = portfolioModel