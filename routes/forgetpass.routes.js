const express = require("express");
const forgetController = require("../controllers/forgetPass.controller");

const Router = express.Router();

Router.route("/").post(forgetController.forgetPassword).put(forgetController.resetPassword);
Router.route("/verify").post(forgetController.verifyPassRestCode);


module.exports = Router;