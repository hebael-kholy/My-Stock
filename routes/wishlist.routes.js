const express = require("express");
const wishlistController = require("../controllers/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.route("/:userid").post(wishlistController.addProductToWL)
.get(wishlistController.getuserWL);

wishlistRouter.route("/:userid/:prductId").delete(wishlistController.removeProductFromWL);

module.exports = wishlistRouter;