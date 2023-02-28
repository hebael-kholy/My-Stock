const Coupon = require("../models/coupon");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

class couponController{

    create = asyncHandler(async(req,res,next)=>{
        const {name, expire, discount} = req.body;
        const newCoupon = new Coupon({
            name,
            expire,
            discount
        })
        await newCoupon.save();
        res.status(200).json({
            status: "success",
            data:newCoupon
        });
    })

    findone = asyncHandler(async (req, res,next) => {
        const { id } = req.params;
        const copuon= await Coupon.findById(id);
        if (!copuon) {
            return next(new ApiError(`Invalid copuon id ${id}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: copuon
        });
    })

    findAll = asyncHandler(async(req,res,next)=>{
        const coupons = await Coupon.find({});
        if (!coupons){ return next(new ApiError(`can't find coupons`, 404));}
        res.status(200).json({
            status: "success",
            usersCount:coupons.length,
            data: coupons
        });
    })

    deleteOne = asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const copuon = await Coupon.findByIdAndDelete(id);
        if (!copuon){ return next(new ApiError(`Invalid copuon id ${id} `, 404));}
        res.status(200).json({
            status: "success",
            message:"Coupon deleted successfully"
        });
    }) 

    updateOne = asyncHandler(async(req,res,next)=>{
        const{id} = req.params;     
        let obj ={};

        if(req.body.name) obj.name = req.body.name;
        if(req.body.expire) obj.expire = req.body.expire;
        if(req.body.discount) obj.discount = req.body.discount;

        const copuon = await Coupon.findByIdAndUpdate(id,obj,{new:true});
        if (!copuon){ return next(new ApiError(`Invalid copon id ${id} `, 404));}
        
        res.status(200).json({
            status: "success",
            data:copuon
        });
        
    })


}

module.exports = new couponController();