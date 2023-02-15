const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

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
          filter: { _id: item.product }, // find product whose id  = item .product
          update: { $inc: { quantity: -item.quantitiy } },
        },
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

  getUserOrder = asyncHandler(async (req, res, next) => {
  
    let filter = {};
    if (req.query.status) filter.status = req.query.status;
    if(req.params.id) filter.user = req.params.id;
    const orders = await Order.find(filter);
    res.status(200).json({
      status: "success",
      data: orders,
    });
  });

  getAllOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new ApiError(`User not found`, 404));
    }
    if (user.role !== "ADMIN") {
      return next(new ApiError(`User not authorized`, 401));
    }
    let filter = {};
    if (req.query.status) filter.status = req.query.status;

    const orders = await Order.find(filter);

    res.status(200).json({
      status: "success",
      orderCount: orders.length,
      data: orders,
    });
  });

  getOrderById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(`Order not found`, 404));
    }
    res.status(200).json({
      status: "success",
      data: order,
    });
  });

  updateOrderPaied = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(`Order not found`, 404));
    }
    order.ispaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  });

  cancleOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(`Order not found`, 404));
    }
    if(order.status == 'pending') order.status = "rejected";
    const updatedOrder = await order.save();

    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  });
 
  acceptOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ApiError(`Order not found`, 404));
    }
    order.status = "accepted";
    const updatedOrder = await order.save();

    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  });
}
module.exports = new orderController();
