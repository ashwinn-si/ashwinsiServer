const internalMarkCalCountModel = require("../../models/internalMarkCalCount")

const addSessionController = async(req, res) =>{
    try{
        const newCount = new internalMarkCalCountModel({
            text : "new session"
        })
        newCount.save();
        res.status(200).json({message: "session added"});
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }  
}

module.exports = addSessionController