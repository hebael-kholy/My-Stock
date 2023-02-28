const express = require("express");
const cartController = require("../controllers/cart.controller");

const cartRouter = express.Router({mergeParams: true});

cartRouter.route("/:user").post(cartController.createCart)

cartRouter.route("/").get(cartController.getUserCart);

cartRouter.route("/delete/:itemid").delete(cartController.deleteItem);

cartRouter.route("/update/:itemid").put(cartController.updateItemQuantity);
cartRouter.route("/applycoupon").put(cartController.applyCoupon);

cartRouter.route("/clear").delete(cartController.clearCart)

module.exports = cartRouter;