const express = require("express");
const categoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.route("/")
.post(categoryController.createCategory)
.get(categoryController.findAll)

categoryRouter.route("/:slug")
.get(categoryController.findone)
.patch(categoryController.updateOne)
.delete(categoryController.deleteOne)

module.exports = categoryRouter;