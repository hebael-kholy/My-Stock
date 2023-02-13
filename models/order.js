const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:['true','User is required']
        },
        cartItems:[{
            product:{
                type:mongoose.Schema.ObjectId,
                ref:'Product'
            },
            quantitiy:Number,
            color:String,
            price:Number
        }],
        taxPrice:{
            type:Number,
            default:0
        },
        shippingPrice:{
            type:Number,
            default:0
        },
        totalPrice:{
            type:Number
        },
        paymentMethod:{
            type:String,
            enum:['card','cash'],
            default:'cash'
        },
        ispaid:{
            type:Boolean,
            default:false
        },
        paidAt:Date,
        status:{
            type:String,
            enum:['pending','accepted','rejected'],
            default:'pending'
        },
        creationDate:{
            type:Date,
            default:Date.now()
        }
    },
    { timestamps:true }
)

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel