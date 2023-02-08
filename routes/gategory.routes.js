const express = require("express");
const categoryController = require("../controllers/category.controller");
const multer = require("../utils/multerConfig");
const {categoryValidator} = require("../utils/validation/category.validator");
const productRoutes = require('./prodcut.routes');

const categoryRouter = express.Router();

categoryRouter.use('/:cid/product',productRoutes)

categoryRouter.route("/")
.post(categoryValidator,categoryController.createCategory)
.get(categoryController.findAll)

categoryRouter.route("/:slug")
.get(categoryController.findone)
.patch(categoryController.updateOne)
.delete(categoryController.deleteOne)

categoryRouter.route("/images/:slug").patch(multer, categoryController.uploadImage);


module.exports = categoryRouter;