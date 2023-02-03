const mongoose = require('mongoose');

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

module.exports = mongoose.model('User',UserSchema);