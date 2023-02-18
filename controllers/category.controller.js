const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const Category =  require("../models/gategory");
const slugify = require("slugify");
const cloud = require('../utils/CloudinaryConfig');
const fs = require("fs");

class categoryController{

    createCategory = asyncHandler(async(req,res,next)=>{
        const {name} = req.body;
        let image;
        const result = await cloud.uploads(req.files[0].path);
        if(req.files[0]) image = result.url;
       
        const newCategory = new Category({
            name,
            slug:slugify(name),
            image
        })

        const added = await newCategory.save();
        if(!added) return next(new ApiError(`Faild to create category`,400))
        res.status(200).json({
            status: "success",
            data:newCategory
        });
    })
    uploadImage = asyncHandler(async(req,res,next)=>{
        const {slug} = req.params;
        
        const result = await cloud.uploads(req.files[0].path);
        if(!result) return next(new ApiError(`Faild to upload image`,400));

        const category = await Category.findByIdAndUpdate(slug,{image:result.url},{new:true});
        if(!category) return next(new ApiError(`Invalid category name ${slug}`, 404));
        
        fs.unlinkSync(req.files[0].path);
        
        res.status(200).json({
            status: "success",
            data:category
        });

    });
    findAll = asyncHandler(async(req,res,next)=>{
        const page = req.query.page * 1 || 1; // * 1 to convert page to number 
        const limit = req.query.limit * 1 || 5;
        const skip = (page -1 ) * limit;
        const cate = await Category.find({}).skip(skip).limit(limit);
        if (!cate){ return next(new ApiError(`Can't find Categories`, 404));}
        res.status(200).json({
            CategoryCount:cate.length,
            data:cate
        });
    })

    findone = asyncHandler(async (req, res,next) => {
        const {slug} = req.params;
        const category = await Category.findOne({slug});
        if (!category) {
            return next(new ApiError(`Invalid category name ${slug}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: category
        });
    })

    updateOne = asyncHandler(async(req,res,next)=>{
        const{slug} = req.params;
        const{name} = req.body;
        let image;
        const result = await cloud.uploads(req.files[0].path);
        if(req.files[0]) image = result.url;
        const cate = await Category.findOneAndUpdate({slug},{name,slug:slugify(name),image},{new:true});
        if (!cate){ return next(new ApiError(`Invalid Category name ${slug} `, 404));}
        res.status(200).json({
            status: "success",
            data: cate
        });
    })

    deleteOne = asyncHandler(async(req,res,next)=>{
        const{slug} = req.params;
        const cate = await Category.findOneAndDelete({slug});
        if (!cate){ return next(new ApiError(`Invalid Category name ${slug} `, 404));}
        res.status(200).json({
            status: "Category deleted Successfully"
        });
    })
}

module.exports = new categoryController()