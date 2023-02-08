const {check} = require("express-validator");
const validatorMidlleware = require("../../middlewares/validator.middle");


exports.categoryValidator = [
        check("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({min: 3})
        .withMessage("Category name must be at least 3 characters long")
        .isLength({max: 30})
        .withMessage("Category name must be less than 30 characters long"),
        validatorMidlleware 
    ];

