const UserController = require("../controllers/user.controller");
const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();


userRouter.route('/signup').post(userController.signUP);


module.exports = userRouter;