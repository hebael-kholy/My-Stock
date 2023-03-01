const User = require("../models/user");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEamil = require("../utils/sendEmail");
const JWT = require("jsonwebtoken");

class forgetController {

  forgetPassword = asyncHandler(async (req, res, next) => {
    //1- find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    //2- if user exist , genetate code of 6 digit and store it to
    // before storing the code we will bcrypt it
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

    user.passRestCode = hashedCode;
    user.passRestExpires = Date.now() + 10 * 60 * 1000;
    user.passRestVerified = false;

    await user.save();

    //3- send to email
    const html = `
     <h3>Hello ${user.name}</h3>
     <p>We recieved a request to rest the password on E-commerceiTi Account.</p>
     <p><b>${code}</b> Enter this code to complete the reset </p>
      <p>Thanks for helping us keep your account secure.</p>
      <p>The Craft Team</p>
     </div>`;

    try {
      await sendEamil({
        email: user.email,
        subject: "Your rest password code (valid for 10 min)",
        html: html,
      });
    } catch (error) {
      user.passRestCode = undefined;
      user.passRestExpires = undefined;
      user.passRestVerified = undefined;

      await user.save();
      return next(new ApiError("Error for sending email", 500));
    }

    res.status(200).json({
      status: "Sucess",
      message: "Password reset code sent to your email",
    });
  });

  verifyPassRestCode = asyncHandler(async (req, res, next) => {
        //1- get user based on rest code
        const hashedCode = crypto.createHash("sha256").update(req.body.code).digest("hex");
        const user = await User.findOne({ 
            passRestCode: hashedCode,
            passRestExpires:{$gt:Date.now()}
        });
        if (!user) {
            return next(new ApiError("Invalid Rest Code or Expired", 400));
        }
        //2- reset code valid
        user.passRestVerified = true;
        await user.save();
        res.status(200).json({
            status:"Sucess"
        })
  })
  resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError("User not found", 404));
    }
    if(!user.passRestVerified){
        return next(new ApiError("Rest code not verified", 400));
    }
    user.password = req.body.newpassword;
    user.passRestCode = undefined;
    user.passRestExpires = undefined;
    user.passRestVerified = undefined;

    await user.save();
    const token = JWT.sign({userID:user.id},process.env.JWT_SECRT_KEY,{
        expiresIn:process.env.JWT_EXPIRE_TIME
    })

    res.status(200).json({
        status:"Sucess",
        token
    })
  })
}

module.exports = new forgetController();
