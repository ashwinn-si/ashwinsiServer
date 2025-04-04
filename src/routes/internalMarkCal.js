const express = require("express");
const router = express.Router();

const internalMarkCalCountModel = require("../models/internalMarkCalCount");
const internalMarkModel = require("../models/internalMark")

router.get("/addSession", (req, res) =>{
    try{
        const newCount = new internalMarkCalCountModel({
            text : "new session"
        })
        newCount.save();
        res.status(200).json({message: "session added"});
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }  
})

router.post("/addMark", (req, res) =>{
     try{
        const newMark = new internalMarkModel({
            mark : req.body.mark
        })
        newMark.save();
        res.status(200).json({message: "mark added"});
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }  
})

module.exports = router