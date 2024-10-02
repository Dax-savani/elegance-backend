const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartSchema = new Schema({
    product_id: {type: String, ref: "Product", required: true},
    cartQuatity: {type: Number, default: 1}
})

const cartSchema = new Schema({
    user_id : {
        ref: 'User',
        type: String,
        required: true,
    },
    products: [cartSchema]
},{timestamps: true})

module.exports = mongoose.model("Cart", cartSchema);