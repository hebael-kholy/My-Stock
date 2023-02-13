const express = require("express");
const productController = require("../controllers/product.controller");
const multer = require("../utils/multerConfig");
const { createProduct } = require("../utils/validation/product.validator");
const reviewRoute = require("./review.routes");

// mergeParams allows us to access parameters from other routers
// we need to access category name from other router

const productRouter = express.Router({ mergeParams: true });

productRouter.route("/").post(createProduct, productController.createProduct)
.get(productController.findAll);

productRouter.route("/:id")
.patch(productController.updateOne)
.put(productController.updateOne)
.delete(productController.deleteOne);

productRouter.route("/get/:id").get(productController.findone)

productRouter.route("/products/sale").get(productController.saleProducts);

productRouter.route("/image/:id")
.patch(multer, productController.uploadImage)
.put(multer, productController.uploadImage);

productRouter.use("/review/:id", reviewRoute);
module.exports = productRouter;
