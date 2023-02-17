const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
/*
cartSchema.pre(/^find/,function(next){
    this.populate({path:'user',select:'name'}).populate({path:'cartItems.product', select:'title'})
    next()
})*/

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel;