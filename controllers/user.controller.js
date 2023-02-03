const User = require("../models/user");

class UserController{
    signUP = async(req,res,next)=>{
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
    }
}
module.exports = new UserController();