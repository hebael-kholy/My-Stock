const User = require("../models/user");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const validator = require("../utils/validation/user.validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const cloud = require('../utils/CloudinaryConfig');
const fs = require("fs");

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
        
        const user = await User.findByIdAndUpdate(id,{name,email,password,gender},{new:true});
        if (!user){ return next(new ApiError(`Invalid id ${id} `, 404));}
        
        res.status(200).json({
            status: "success",
            data: user
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
        res.setHeader(token);
        res.status(200).json({
            status:"Sucess",
            user:user,
            token
        })

    })
    Adminlogin = asyncHandler(async(req,res,next)=>{
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
        if(!user.role==="ADMIN"){
            return next(new ApiError(`Anauthorized !!!`, 401));
        }
    
        res.status(200).json({
            status:"Sucess",
            user:user,
            token
        })

    })
    uploadImage = asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
      
        const result = await cloud.uploads(req.files[0].path);
        const user = await User.findOneAndUpdate({id},{image:result.url},{new:true});

        fs.unlinkSync(req.files[0].path);
        res.status(200).json({
            status:"Sucess",
            user:user
        })
    })

    getloggedUserData = asyncHandler(async(req,res,next)=>{
        req.params.id = req.user._id;
        next();
    })
}

module.exports = new UserController();