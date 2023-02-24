const express = require("express");
const orderController = require("../controllers/order.controllers");

const orderRouter = express.Router({ mergeParams: true });

orderRouter.route("/:user/:cartId").post(orderController.createCashOrder);

orderRouter.get("/admin/:id/top",orderController.getLast3Order);

orderRouter.route("/user/:id").get(orderController.getUserOrder);
orderRouter.route("/admin/:id").get(orderController.getAllOrder);
orderRouter.route("/:id").get(orderController.getOrderById);

orderRouter.route("/:id/pay").put(orderController.updateOrderPaied);
orderRouter.route("/:id/cancle").put(orderController.cancleOrder);
orderRouter.route("/:id/accept").put(orderController.acceptOrder);

module.exports = orderRouter;
