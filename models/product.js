const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            trim:true,
            require:[true, "product title is required"],
            unique:[true, "product title must be unique"],
            minlength:[3,"Too short product title name"],
            maxlength:[30, "Too long product title name"]
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
            type:String
        }
    },
    {
        timestamps:true
    }
);

const productModel = mongoose.model('Gategory', productSchema);
module.exports = productModel;