const mongoose = require("mongoose");
const URL = "http://res.cloudinary.com/dwmkkev1m/image/upload/v1675784988/flrvrm8bx5dwjbzeimzm.jpg"
const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            require:[true, "product title is required"],
            unique:[true, "product title must be unique"],
            minlength:[3,"Too short product title name"],
            maxlength:[300, "Too long product title name"]
        },
        slug:{
            type:String,
            lowercase:true,
            unique:true
        },
        description:{
            type:String,
            required:[true, "product description is required"]
        },
        price:{
            type:Number,
            required:[true, "product price is required"],
            trim:true,
        },
        image:{
            type:String,
            default:URL
        },
        isSale:{
            type:Boolean,
            default:false
        },
        quantity:{
            type:Number,
            default:1
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Gategory'
        },
        rating:{
            type:Number,
            default:0
        },
        brand:{
            type:String
        },
        colors:[String]
    },
    {
        timestamps:true
    }
);

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;