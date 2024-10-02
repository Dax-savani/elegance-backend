const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartProductSchema = new Schema({
    product_id: {type: String, ref: "Product", required: true},
    cartQuatity: {type: Number, default: 1}
})

const cartSchema = new Schema({
    user_id : {
        ref: 'User',
        type: String,
        required: true,
    },
    products: [cartProductSchema]
},{timestamps: true})

module.exports = mongoose.model("Cart", cartSchema);