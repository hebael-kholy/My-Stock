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
    role:joi.string().valid("USER","ADMIN")
})

// const validator = asyncHandler(async(req,res,next)=>{

//     const validate = await schema.validateAsync(req.body);
//     console.log(validate)
//     if(!validate){
//         return next(new ApiError(`invalid validation`, 400));
//     }
//     next();
     
// });

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