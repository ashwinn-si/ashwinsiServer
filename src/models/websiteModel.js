const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const websiteModel = mongoose.model("website", websiteSchema);

module.exports = websiteModel;
