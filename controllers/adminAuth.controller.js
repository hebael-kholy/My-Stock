const JWT = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const ApiError = require("../utils/apiError");

const isAdmin = asyncHandler(async(req, res,next)=>{
    if(req.user && req.user.role ==='ADMIN'){
        next()
    }
    else{
        return next(new ApiError(`not authurization to acces`,401));
    }
})

module.exports = isAdmin;