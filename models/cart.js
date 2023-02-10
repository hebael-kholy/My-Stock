const mongoose = require("mongoose");

const carytSchema = new mongoose.Schema(
    {
        cartItems:[{
                product:{
                    type:mongoose.Schema.ObjectId,
                    ref:'Product'
                },
                quantitiy:{
                    type:Number,
                    default:1
                },
                color:String,
                price:Number
            }
        ],
        totalCarPrice:Number,
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
);

const cartModel = mongoose.model('Cart', carytSchema);
module.exports = cartModel;