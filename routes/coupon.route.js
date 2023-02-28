const express = require("express");
const couponController = require("../controllers/couponController");

const couponRouter = express.Router();

couponRouter.route("/").post(couponController.create)
.get(couponController.findAll);

couponRouter.route("/:id").get(couponController.findone)
.delete(couponController.deleteOne)
.put(couponController.updateOne);


module.exports = couponRouter ;