const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {

    },
    { timestamps:true }
)

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel