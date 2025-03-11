const mongoose = require("mongoose")
require("dotenv").config();

const dbConnect = async() =>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log("unable to connect to database")
    })
}

module.exports = dbConnect