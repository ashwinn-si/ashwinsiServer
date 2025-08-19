const express = require("express");
const jagadishBdayController = require("../controllers/bdayController/jagadishbdayController");
const jeeviaBdayController = require("../controllers/bdayController/jeeviaBdayController");
const router = express.Router()


router.get("/jagadish-bday", jagadishBdayController)

router.get("/jeevia-bday", jeeviaBdayController)

module.exports = router;