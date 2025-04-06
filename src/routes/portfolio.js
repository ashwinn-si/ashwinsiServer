const express = require('express');
const router = express.Router();

const skillrackDataController = require('../controllers/portfolioControllers/skillrackDataController')
const leetcodeDataController = require('../controllers/portfolioControllers/leetcodeDataController')
const verifyRequest = require('./../middlewares/authRequest')
const countController = require('../controllers/portfolioControllers/countController')

router.get("/skillrackData", skillrackDataController);
router.get("/leetcodeData", verifyRequest, leetcodeDataController);
router.post("/count", countController);

module.exports = router