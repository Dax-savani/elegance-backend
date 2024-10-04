const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    user_id : {
        type: String,
        ref: 'User',
        required: true,
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true,
    },
    qty: {
        type: Number,
        default: 1,
        required: true,
    },
    totalPrice: {
      type: String,
       required: true
    },
    shippingPrice: {
      type: String,
       required: true
    },
    subTotalPrice: {
      type: String,
       required: true
    },
    status: {
        type: String,
        enum: ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'placed',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema);