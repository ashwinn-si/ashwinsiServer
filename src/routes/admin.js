const express = require("express");
const Router = express.Router();

const dateController = require("../controllers/adminController/dateController")
const countController = require("../controllers/adminController/countController")


Router.get("/portfolio/count/date", dateController)
Router.get("/portfolio/count", countController)
module.exports = Router;