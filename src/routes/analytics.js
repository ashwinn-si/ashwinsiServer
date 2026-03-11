const express = require("express");
const router = express.Router();

const authRequest = require("./../middlewares/authRequest")
const { addAnalyticDetails, getAnalyticDetails } = require("./../controllers/analyticController/analyticController")

router.get("/add-analytics", addAnalyticDetails)

router.get("/get-analytics", authRequest, getAnalyticDetails)


module.exports = router;