const express = require("express");
const router = express.Router();

const internalMarkCalCountModel = require("../models/internalMarkCalCount");
const internalMarkModel = require("../models/internalMark")

const addSessionController = require("../controllers/internalMarkController/addSession")
const addMarkController = require("../controllers/internalMarkController/addMark")

router.get("/addSession", addSessionController)

router.post("/addMark", addMarkController)

router.get("/getCount", async (req, res) => {
    try{
        const visitCount = await internalMarkCalCountModel.countDocuments();
        const calCount = await internalMarkModel.countDocuments();

        res.status(200).json({
            visitCount,
            calCount
        });
    }catch(err){
        console.log(err)
        res.status(500).json({message: "internal server error"})
    }
})

module.exports = router