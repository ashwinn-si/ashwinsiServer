const mongoose = require("mongoose")

const userModelSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true
    },
    password:{
        type: String,
        trim: true
    }
})

const userModel = mongoose.model("User", userModelSchema)

module.exports = userModel;