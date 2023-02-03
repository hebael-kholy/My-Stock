const User = require("../models/user");
const asyncHandler = require("express-async-handler");

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
        if (!users) return next(new ApiError(`can't find users`, 404));
        res.status(200).json({
            status: "success",
            data: users
        });
    })

    findone = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return next(new ApiError(`Invalid id `, 404));
        }
        res.status(200).json({
            status: "success",
            data: user
        });
    })
}
module.exports = new UserController();