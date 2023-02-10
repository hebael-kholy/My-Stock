const mongoose = require("mongoose");

const URL = "http://res.cloudinary.com/dwmkkev1m/image/upload/v1675784988/flrvrm8bx5dwjbzeimzm.jpg"

const categorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:[true, "Category is required"],
            unique:[true, "Category must be unique"],
            minlength:[3,"Too short category name"],
            maxlength:[30, "Too long category name"]
        },
        slug:{
            type:String,
            lowercase:true,
            unique:true
        },
        image:{
            type:String,
            default:URL
        }
    },
    {
        timestamps:true
    }
);

const categoryModel = mongoose.model('Gategory', categorySchema);
module.exports = categoryModel;