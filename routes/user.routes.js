const UserController = require("../controllers/user.controller");
const express = require("express");
const userController = require("../controllers/user.controller");
const validator = require("../utils/user.validator");
const userAuth = require("../controllers/UserAuth.controller");
const isAdmin = require ("../controllers/adminAuth.controller")

const userRouter = express.Router();


userRouter.route('/signup').post(validator,userController.signUP);
userRouter.route('/login').post(userController.login);

userRouter.route('/').get(userController.findAll);
userRouter.route('/:id').get(userController.findone);

userRouter.route('/delete/:id').delete(userAuth,userController.deleteOne);

userRouter.route('/update/:id').patch(userAuth,validator,userController.updateOne);

module.exports = userRouter;