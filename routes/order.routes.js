const express = require("express");
const orderController = require("../controllers/order.controllers");

const orderRouter = express.Router({mergeParams: true});

orderRouter.route("/")

module.exports = orderRouter;