const express = require("express");
const categoryController = require("../controllers/category.controller");
const multer = require("../utils/multerConfig");


const categoryRouter = express.Router();

categoryRouter.route("/")
.post(multer,categoryController.createCategory)
.get(categoryController.findAll)

categoryRouter.route("/:slug")
.get(categoryController.findone)
.patch(categoryController.updateOne)
.delete(categoryController.deleteOne)

module.exports = categoryRouter;