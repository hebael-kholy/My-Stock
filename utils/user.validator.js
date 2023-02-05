const joi = require('joi');
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

const schema = joi.object({
    name: joi.string().min(3).max(20).messages({
        'string.base': `Name should be a type of 'text'`,
        'string.empty': `Name cannot be an empty field`,
        'string.min': `Name should have a minimum length of {#limit}`,
        'any.required': `Name is a required field`
      }),
    email: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: joi.string().min(3).max(20),
    gender:joi.string().valid("male","female"),
    role:joi.string().valid("USER","ADMIN"),
    image:joi.string().default("http://res.cloudinary.com/dwmkkev1m/image/upload/v1675619457/gj2zshyuqvc0db2fyrst.jpg")
})


const validator = async(req,res,next)=>{
    try {
        await schema.validateAsync(req.body);
        next();
      } catch (error) {
        error.statusCode = 422;
        next(error);
      }
    };
module.exports =  validator;