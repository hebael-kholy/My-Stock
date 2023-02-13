const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");


class orderController {
  createCashOrder = asyncHandler(async (req, res, next) => {
    const { shippingPrice, taxPrice } = req.body;
    //1- get cat items
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }
    //2- calculate total price and create new order
    const cartPrice = cart.totalCarPrice;
    const TOP = cartPrice + shippingPrice + taxPrice;

    const order = new Order({
      user: req.params.user,
      shippingPrice,
      taxPrice,
      cartItems: cart.cartItems,
    });
    order.totalPrice = TOP;
    // 4- after creating order we need to decrement order quantity

    //// bulkWrite is used to send multiple operations(insertone,update,delete......) to the database in a single command
    // bulk write take bulk option as first input ,setting it as second input
    if (order) {
      const bulkoption = cart.cartItems.map((item) => ({
        updateOne: {
          filter: {_id: item.product}, // find product whose id  = item .product
          update: { $inc: { quantitiy: -item.quantitiy} },
        }
      }));  
    
      await Product.bulkWrite(bulkoption, {});

      //5- clear cart depend on cart id
      await Cart.findByIdAndDelete(req.params.cartId);
    }
    await order.save();
    res.status(201).json({
      status: "success",
      data: order,
    });
  });
}
module.exports = new orderController();
