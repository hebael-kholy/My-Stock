const mongoose = require("mongoose");

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
            lowercase:true
        }
    },
    {
        timestamps:true
    }
);

const categoryModel = mongoose.model('Gategory', categorySchema);
module.exports = categoryModel;