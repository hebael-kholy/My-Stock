const UserController = require("../controllers/user.controller");
const express = require("express");
const userController = require("../controllers/user.controller");
const validator = require("../utils/user.validator");
const userRouter = express.Router();


userRouter.route('/signup').post(validator,userController.signUP);

userRouter.route('/').get(userController.findAll);
userRouter.route('/:id').get(userController.findone);

userRouter.route('/delete/:id').delete(userController.deleteOne);

userRouter.route('/update/:id').patch(validator,userController.updateOne);

module.exports = userRouter;