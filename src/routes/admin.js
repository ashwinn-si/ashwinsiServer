const express = require("express");
const Router = express.Router();

const dateController = require("../controllers/adminController/dateController")
const countController = require("../controllers/adminController/countController")
const addAdminController = require("../controllers/adminController/addAdmin")
const loginController = require("./../controllers/adminController/login")
const logoutController = require("./../controllers/adminController/logoutController")
const authRequest = require("./../middlewares/authRequest")

Router.get("/portfolio/count/date", authRequest, dateController)
Router.get("/count", authRequest, countController)
Router.post("/addAdmin", authRequest, addAdminController);
Router.post("/login", loginController);
Router.delete("/logout", logoutController);
module.exports = Router;