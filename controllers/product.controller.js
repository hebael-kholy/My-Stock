const Product = require("../models/product");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloud = require("../utils/CloudinaryConfig");
const fs = require("fs");

class productController {
  createProduct = asyncHandler(async (req, res, next) => {
    const {
      title,
      description,
      price,
      brand,
      isSale,
      quantity,
      category,
      rating,
    } = req.body;
    const newProduct = new Product({
      title,
      slug: slugify(title),
      description,
      price,
      brand,
      isSale,
      quantity,
      category,
      rating,
    });
    const added = await newProduct.save();
    if (!added) return next(new ApiError(`Faild to create product`, 400));
    res.status(200).json({
      status: "success",
      data: added,
    });
  });

  createProductall = asyncHandler(async (req, res, next) => {
    const {
      title,
      description,
      price,
      brand,
      isSale,
      quantity,
      category,
      rating,
    } = req.body;
    let image;
    const result = await cloud.uploads(req.files[0].path);
    if(req.files[0]) image = result.url;

    const newProduct = new Product({title,slug: slugify(title),description,price,brand,isSale,quantity,category,rating,image});
    const added = await newProduct.save();
    if (!added) return next(new ApiError(`Faild to create product`, 400));
    res.status(200).json({
      status: "success",
      data: added,
    });
  });

  uploadImage = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await cloud.uploads(req.files[0].path);
    if (!result) return next(new ApiError(`Faild to upload image`, 400));

    const product = await Product.findByIdAndUpdate(id,{image:result.url},{new:true});
    if (!product) return next(new ApiError(`Invalid product id ${id}`, 404));

    fs.unlinkSync(req.files[0].path);

    res.status(200).json({
      status: "success",
      data: product,
    });
  });

  updateDataAndImage = asyncHandler(async (req, res, next) => {
    let image ;
    const { id } = req.params;
    const {
      title,
      description,
      price,
      brand,
      isSale,
      quantity,
      category,
      rating,
    } = req.body;
    const result = await cloud.uploads(req.files[0].path);
    console.log(result)
    if (!result) return next(new ApiError(`Faild to upload image`, 400));
    
    if(req.file) image = result.url;
    
    const user = await Product.findByIdAndUpdate(
      id,
      { title, description, price, brand, isSale, quantity, category, rating ,image:result.url },

      { new: true }
    );
    if (!user) {
      return next(new ApiError(`Invalid id ${id} `, 404));
    }
    fs.unlinkSync(req.files[0].path);
    res.status(200).json({
      status: "success",
      data: user,
    });

  })

  findAll = asyncHandler(async (req, res, next) => {
    const page = req.query.page * 1 || 1; // * 1 to convert page to number
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const filter = {};
    if (req.params.cid) filter.category = req.params.cid;

    const product = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({ path: "category", select: "name" });
    if (!product) {
      return next(new ApiError(`Can't find Products`, 404));
    }
    res.status(200).json({
      productCount: product.length,
      data: product,
    });
  });

  saleProducts = asyncHandler(async (req, res, next) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const filter = {};
    filter.isSale = true;

    const product = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({ path: "category", select: "name" });
    if (!product) {
      return next(new ApiError(`Can't find Products`, 404));
    }
    res.status(200).json({
      productCount: product.length,
      data: product,
    });
  });
  /*findone = asyncHandler(async (req, res,next) => {
        const {id} = req.params;
        const product = await Product.findById(id).populate({path:"category",select:"name"});

        if (!product) {
            return next(new ApiError(`Invalid product id ${id}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: product
        });
    })*/

  findone = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "category",
      select: "name",
    });
    if (!product) {
      return next(new ApiError(`Invalid id ${id}`, 404));
    }
    res.status(200).json({
      status: "success",
      data: product,
    });
  });
  updateOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      brand,
      isSale,
      quantity,
      category,
      rating,
    } = req.body;

    const user = await Product.findByIdAndUpdate(
      id,
      { title, description, price, brand, isSale, quantity, category, rating },
      { new: true }
    );
    if (!user) {
      return next(new ApiError(`Invalid id ${id} `, 404));
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  });

  deleteOne = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return next(new ApiError(`Invalid id ${id} `, 404));
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  });
}

module.exports = new productController();
