const User = require("../models/user");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

class wishlistController {
    addProductToWL = asyncHandler(async(req,res,next)=>{
        const {userid} = req.params;
        const user = await User.findByIdAndUpdate(userid,{
            // operator (addToSet) used to add item in array  inside mongoDb
            // $addToSet ==> add productId to wishlist array if productId not exist in it
            $addToSet: {
                wishList: req.body.productId
            }
        },{new:true});
        if(!user){
            return next(new ApiError("User not found",404));
        }
        res.status(200).json({
            success:"sucessfully added to wishlist",
            data:user.wishList
        })
    })

    removeProductFromWL = asyncHandler(async(req,res,next)=>{
        const {userid,prductId} = req.params;
        const user = await User.findByIdAndUpdate(userid,{
            // $addToSet ==> remove productId from wishlist array if productId  exist
            $pull: {
                wishList:prductId
            }
        },{new:true});
        if(!user){
            return next(new ApiError("User not found",404));
        }
        res.status(200).json({
            success:"sucessfully removed from wishlist",
            data:user.wishList
        })
    })

    getuserWL = asyncHandler(async(req,res,next)=>{
        const {userid} = req.params;
        const user = await User.findById(userid).populate('wishList');
        if(!user){
            return next(new ApiError("User not found",404));
        }
        res.status(200).json({
            success:"user's wishlist",
            count:user.wishList.length,
            data:user.wishList
        })
    })

}
module.exports = new wishlistController();


