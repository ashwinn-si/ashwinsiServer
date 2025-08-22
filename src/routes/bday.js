const express = require("express");
const { jagadishBdayController, jagadishBdayCountController, jagadishBdayDateController } = require("../controllers/bdayController/jagadishbdayController");
const { jeeviaBdayController, jeeviaBdayDateController, jeeviaBdayCountController } = require("../controllers/bdayController/jeeviaBdayController");
const authRequest = require("./../middlewares/authRequest")
const router = express.Router()


router.get("/jagadish-bday", jagadishBdayController)

router.get("/jeevia-bday", jeeviaBdayController)

router.get("/jimmy/count/date", authRequest, jagadishBdayDateController)

router.get("/jimmy/count", authRequest, jagadishBdayCountController)

router.get("/jeevia/count/date", authRequest, jeeviaBdayDateController)

router.get("/jeevia/count", authRequest, jeeviaBdayCountController)

module.exports = router;