const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const URL = "http://res.cloudinary.com/dwmkkev1m/image/upload/v1675619457/gj2zshyuqvc0db2fyrst.jpg";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: [3, 'Name must contain at least 3 characters'],
        required: [true, 'Name is required'],
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:[true,'Email is already exist']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    gender:{
        type:String,
        enum:["male" , "female"],
        required:[true, 'Gender is required']
    },
    image:{
        type:String,
        default:URL
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    cart: {
        // items: [{
        //   productId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Product',
        //     required: true
        //   },
        //   quantity: {
        //     type: Number,
        //     required: true
        //   }
        // }],
        default: {}
      },

},{strictQuery:true})


UserSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();

    const salt =  await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = mongoose.model('User',UserSchema);