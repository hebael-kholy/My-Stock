const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Cart = require('../models/cart');
const Product = require('../models/product');

class cartController{

    createCart = asyncHandler(async (req, res, next) => {
        const {productId, color} = req.body;
        const product = await Product.findById(productId);
        // Get cart for lodded user
        let cart  = await Cart.findOne({userId: req.user._id});

        if(!cart){
            // crete cart for logged user with product
             cart = new Cart({
                user: req.user._id,
                cartItems: [{product:productId,color,price:product.price}] 
            });
        }else{
            // product already exist in cart ==> update product quantity
            const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId && item.color === color);
            if(productIndex > -1){
                const cartItem = cart.cartItems[productIndex]
                cartItem.quantity += 1;
                cart.cartItems[productIndex] = cartItem;
            }
            // prodcut does not exist in cart ==> add product to cart
            else{
                cart.cartItems.push({product:productId,color,price:product.price});
            }
        }
        // calculate total price
        const total = 0;
        cart.cartItems.forEach(item => {
            total += item.price * item.quantity;
        })
        await cart.save();
        res.status(200).json({
            status: "success",
            data: cart
        })
    })
    

}

module.exports = new cartController();