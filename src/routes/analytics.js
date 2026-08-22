const express = require("express");
const router = express.Router();

const authRequest = require("./../middlewares/authRequest")
const { 
  addAnalyticDetails, 
  getAnalyticDetails,
  deleteAnalyticRecord,
  getWebsites,
  addWebsite
} = require("./../controllers/analyticController/analyticController")

router.get("/add-analytics", addAnalyticDetails)
router.get("/get-analytics", authRequest, getAnalyticDetails)
router.delete("/delete-analytics/:id", authRequest, deleteAnalyticRecord)

router.get("/websites", getWebsites)
router.post("/websites", authRequest, addWebsite)

module.exports = router;