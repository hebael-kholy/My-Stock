const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Product = require("../models/product");

class cartController {
  createCart = asyncHandler(async (req, res, next) => {
    const { product, color } = req.body;
    const { user } = req.params;
    const productCart = await Product.findById(product);
    if (!productCart) {
      return next(new ApiError(`user not found`, 404));
    }
    // Get cart for lodded user
    let cart = await Cart.findOne({ user });

    let productObj = {};
    productObj.product = product;
    productObj.color = color;
    productObj.price = productCart.price;

    if (!cart) {
      // crete cart for logged user with product
      cart = new Cart({
        cartItems: [productObj],
        user,
      });
    } else {
      // product already exist in cart ==> update product quantity
      const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === product && item.color === color
      );
      if (productIndex > -1) {
        const cartItem = cart.cartItems[productIndex];
        cartItem.quantitiy += 1;
        cart.cartItems[productIndex] = cartItem;
      }
      // prodcut does not exist in cart ==> add product to cart
      else {
        cart.cartItems.push(productObj);
      }
    }
    // calculate total price
    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.price * item.quantitiy;
    });
    cart.totalCarPrice = total;
    cart.totalAfterDiscount = undefined;
    await cart.save();
    res.status(200).json({
      status: "success",
      numOFItem: cart.cartItems.length,
      data: cart,
    });
  });

  getUserCart = asyncHandler(async (req, res, next) => {
    const filter = {};
    if (req.params.userid) filter.user = req.params.userid;

    let cart = await Cart.findOne(filter)
      .populate({ path: "user", select: "name" })
      .populate({
        path: "cartItems.product",
        select: "title image description",
      });
    if (!cart) {
      return next(new ApiError(`user cart not found`, 404));
    }
    res.status(200).json({
      numOfItem: cart.cartItems.length,
      data: cart,
    });
  });
  deleteItem = asyncHandler(async (req, res, next) => {
    const { userid, itemid } = req.params;
    // using pull object to delete item form cartItems array of cart
    const cart = await Cart.findOneAndUpdate(
      userid,
      { $pull: { cartItems: { _id: itemid } } },
      { new: true }
    );
    if (!cart) {
      return next(new ApiError(`user cart not found`, 404));
    }
    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.price * item.quantitiy;
    });
    cart.totalCarPrice = total;
    cart.totalAfterDiscount = undefined;

    await cart.save();
    res.status(200).json({
      numOfItem: cart.cartItems.length,
      data: cart,
    });
  });
  clearCart = asyncHandler(async (req, res, next) => {
    const { userid } = req.params;
    const cart = await Cart.findOneAndDelete(userid);
    if (!cart) {
      return next(new ApiError(`user cart not found`, 404));
    }
    res.status(200).json({
      status: "cart deleted successfully",
    });
  });
  updateItemQuantity = asyncHandler(async (req, res, next) => {
    const { itemid } = req.params;
    const { userid } = req.params;
    const cart = await Cart.findOne({ user: userid });
    if (!cart) {
      return next(new ApiError(`user cart not found`, 404));
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() == itemid
    );
    console.log(itemIndex);
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantitiy = req.body.quantity;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      return next(new ApiError(`there is no item for this id ${itemid}`, 404));
    }

    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.price * item.quantitiy;
    });
    cart.totalCarPrice = total;
    cart.totalAfterDiscount = undefined;
    await cart.save();
    res.status(200).json({
      status: "success",
      numOFItem: cart.cartItems.length,
      data: cart,
    });
  });

  applyCoupon = asyncHandler(async (req, res, next) => {
    const { userid } = req.params;
    const coupon =  await Coupon.findOne({
      name:req.body.coupon,
      expire:{$gt:Date.now()}
    });
    if (!coupon) {return next(new ApiError(`Invalid coupon or expired `, 404));}
    const cart = await Cart.findOne({ user: userid });
    if (!cart) {return next(new ApiError(`Invalid user Cart`, 404));}
    const totalPrice = cart.totalCarPrice;
    const totalAfterDiscount = (totalPrice - (totalPrice * coupon.discount / 100)).toFixed(2);

    cart.totalAfterDiscount = totalAfterDiscount;
    await cart.save();
    res.status(200).json({
      status: "success",
      numOFItem: cart.cartItems.length,
      data: cart,
      discount:(totalPrice * coupon.discount / 100)
    });

  })
}

module.exports = new cartController();
