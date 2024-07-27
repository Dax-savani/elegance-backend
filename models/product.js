const mongoose = require("mongoose");
const { Schema } = mongoose;

const productDetailSchema = new Schema({
    detail_1: {
        type: String,
        required: true,
    },
    detail_2: {
        type: String,
        required: true,
    },
}, {
    _id: false
});

const productPriceSchema = new Schema({
    orignal_price: {
        type: String,
        required: true,
    },
    discounted_price: {
        type: String,
        required: true,
    },
}, {
    _id: false
});

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    product_details: {
        type: productDetailSchema,
        required: true
    },
    price: {
       type: productPriceSchema,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Unisex'],
        validate: {
            validator: function(v) {
                return ['Male', 'Female', 'Unisex'].includes(v);
            },
            message: '{VALUE} is not a valid gender'
        }
    },
    gold_purity: {
        type: Number,
        required: true,
        min: 1,
        max: 24,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    gross_weight: {
        type: [Number],
        required: true,
        validate: {
            validator: function(v) {
                return v.every(weight => weight > 0);
            },
            message: 'Each weight in the array must be a positive number'
        }
    },
    product_images: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: "At least one product image is required."
        }
    },
    product_specifications: {
        type: Object,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
