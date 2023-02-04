const User = require("../models/user");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const validator = require("../utils/user.validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const multerConfig = require('../utils/multerConfig');
const cloud = require('../utils/CloudinaryConfig');

class UserController{
    signUP = asyncHandler(async(req,res,next)=>{
        const {name, email, password,gender,role} = req.body;
        const newUser = new User({
            name,
            email,
            password,
            gender,
            role
        })
        await newUser.save();
        res.status(200).json({
            status: "success",
            data:newUser
        });
    })

    findAll = asyncHandler(async(req,res,next)=>{
        const users = await User.find({});
        if (!users){ return next(new ApiError(`can't find users`, 404));}
        res.status(200).json({
            status: "success",
            data: users
        });
    })

    findone = asyncHandler(async (req, res,next) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return next(new ApiError(`Invalid id ${id}`, 404));
        }
        res.status(200).json({
            status: "success",
            data: user
        });
    })

    deleteOne = asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user){ return next(new ApiError(`Invalid id ${id} `, 404));}
        res.status(200).json({
            status: "success",
            data: user
        });
    }) 

    updateOne = asyncHandler(async(req,res,next)=>{
        const{id} = req.params;
        const{name,email,password,gender} = req.body;
        const user = await User.findByIdAndUpdate(id,{name,email,password,gender});
        if (!user){ return next(new ApiError(`Invalid id ${id} `, 404));}
        const updeatedUser = await User.findById(id);
        res.status(200).json({
            status: "success",
            data: updeatedUser
        });
    })

    login = asyncHandler(async(req,res,next)=>{
        const{email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return next(new ApiError(`Invalid Email or Password`, 401));
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)return next(new ApiError(`Invalid Email or Password`,401));
        const token = JWT.sign({userID:user.id},process.env.JWT_SECRT_KEY,{
            expiresIn:process.env.JWT_EXPIRE_TIME
        })
        res.status(200).json({
            status:"Sucess",
            user:user,
            token
        })

    })
    uploadImage=asyncHandler(async,(req,res,next)=>{
        console.log()
    })
}
module.exports = new UserController();