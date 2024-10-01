const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    user_id : {
        ref: 'User',
        type: String,
        required: true,
    },
    product_id: {
        ref:"Product",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    cartQuantity: {
        type: Number,
        default: 1,
        required: true,
    }
})

module.exports = mongoose.model("Cart", cartSchema);