const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Review = require("../models/review");
const Product = require("../models/product")

class reviewController{
    createReview = asyncHandler(async(req, res, next) =>{
        const{title,rating,user,productid} = req.body;
        const product = await Product.findById(productid);
        if(!product){
            return  next(new ApiError("Product not found",404));
        }
        const review = new Review({
            title,
            rating,
            user,
            product:productid
        })
        await review.save();
        res.status(200).json({
            success: true,
            data: review
        })
    })
    findList = asyncHandler(async(req, res, next) =>{
        const page = req.query.page * 1 || 1;  
        const limit = req.query.limit * 1 || 5;
        const skip = (page -1 ) * limit;
        const filter = {};
        if(req.params.id) filter.product = req.params.id;
        
        const review = await Review.find(filter).skip(skip).limit(limit).populate({path:"product",select:"title"});
        if (!review){ return next(new ApiError(`Can't find reviews`, 404));}
        res.status(200).json({
            reviewCount:review.length,
            data:review
        });
    })
    findReview = asyncHandler(async(req, res, next) =>{
        const {id} = req.params;
        const review = await Review.findOne({id});

        if (!review) {
            return next(new ApiError(`Invalid review id ${id}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: review
        });
    })
    deleteReview = asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review){ return next(new ApiError(`Invalid id ${id} `, 404));}
        
        res.status(200).json({
            status: "success",
            data: review
        });
    }) 

}
module.exports = new reviewController()