const express = require('express');
const router = express.Router();

const skillrackDataController = require('../controllers/portfolioControllers/skillrackDataController')
const leetcodeDataController = require('../controllers/portfolioControllers/leetcodeDataController')
const verifyRequest = require('./../middlewares/authRequest')

router.get("/skillrackData", verifyRequest, skillrackDataController);

router.get("/leetcodeData", verifyRequest, leetcodeDataController);


module.exports = router