const mongoose = require('mongoose');

const cgpaSchema = new mongoose.Schema({
    cgpa: {
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const cgpaModel = mongoose.model("CGPA", cgpaSchema)

module.exports = cgpaModel;