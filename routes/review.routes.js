const express = require("express");
const reviewController = require("../controllers/review.controller");

const reviewRouter = express.Router({mergeParams: true});

reviewRouter.route("/").post(reviewController.createReview)
.get(reviewController.findList);

reviewRouter.route("/:id").get(reviewController.findReview)
.delete(reviewController.deleteReview)


module.exports = reviewRouter
