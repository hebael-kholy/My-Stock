const express = require("express");
const orderController = require("../controllers/order.controllers");

const orderRouter = express.Router({mergeParams: true});

orderRouter.route("/:user/:cartId").post(orderController.createCashOrder);

orderRouter.route("/user/:id").get(orderController.getUserOrder)
orderRouter.route("/admin/:id").get(orderController.getAllOrder);
orderRouter.route("/:id").get(orderController.getOrderById);

module.exports = orderRouter;