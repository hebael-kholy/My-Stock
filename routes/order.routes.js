const express = require("express");
const orderController = require("../controllers/order.controllers");

const orderRouter = express.Router({mergeParams: true});

orderRouter.route("/:user/:cartId").post(orderController.createCashOrder);

module.exports = orderRouter;