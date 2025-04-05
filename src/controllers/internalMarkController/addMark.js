const internalMarkModel = require("../../models/internalMark")

const addMarkController = async(req, res) => {
    try{
        const newMark = new internalMarkModel({
        mark : req.body.mark
    })
        newMark.save();
        res.status(200).json({message: "mark added"});
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }  
}

module.exports = addMarkController