const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
        type:String
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

})


UserSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();

    const salt =  await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

module.exports = mongoose.model('User',UserSchema);