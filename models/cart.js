const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    user: {
        ref: 'User',
        type: String,
        required: true,
    },
    product: {type: String, ref: "Product", required: true},
    cartQuantity: {type: Number, default: 1}
}, {timestamps: true})

module.exports = mongoose.model("Cart", cartSchema);