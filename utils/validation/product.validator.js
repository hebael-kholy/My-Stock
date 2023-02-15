const {check} = require("express-validator");
const validatorMidlleware = require("../../middlewares/validator.middle");


exports.createProduct = [
        check("title")
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({min: 3})
        .withMessage("Product name must be at least 3 characters long")
        .isLength({max: 300})
        .withMessage("Product name must be less than 300 characters long"),
        
        check("description")
        .notEmpty()
        .withMessage("Product description is required"),
        
        check("price")
        .notEmpty()
        .withMessage("Product price is required")
        .isNumeric()
        .withMessage("Product price must be a number"),
        
        check("quantity")
        .isNumeric()
        .withMessage("Product quantity must be a number"),
        
        check("rating")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Product rating must be a number between 1 and 5"),

        check("category")
        .notEmpty()
        .withMessage("Product category is required")
        .isMongoId()
        .withMessage("Product category must be a valid mongo id"),

        check("isSale")
        .isBoolean()
        .withMessage("Product isSale must be a boolean"),
        
        validatorMidlleware 
    ];