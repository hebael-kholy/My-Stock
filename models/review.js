const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        rating:{
            type:Number,
            min:[1, "Rating must be greater than 1"],
            max:[5, "Rating must be less than 5"]
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required: [true, "user is required"],
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'Product',
            required: [true, "product is required"],
        }
    },
    {
        timestamps: true
    }
)


reviewSchema.pre(/^find/,function(next){
    this.populate({path:'user',select:'name image'}).populate({path:'product', select:'title'})
    next()
})
const reviewModel = mongoose.model('Review', reviewSchema);
module.exports = reviewModel;