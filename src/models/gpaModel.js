const mongoose = require('mongoose');

const gpaSchema = new mongoose.Schema({
    gpa: {
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const gpaModel = mongoose.model("GPA", gpaSchema)

module.exports = gpaModel;