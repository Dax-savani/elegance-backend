const mongoose = require("mongoose");
const { Schema } = mongoose;

// Short description schema
const shortDescriptionSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    listItem: {
        type: [String],
        required: true,
        validate: {
            validator: Array.isArray,
            message: 'listItem must be an array of strings'
        }
    }
}, { _id: false });

// Description schema
const descriptionTextSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

// Product schema
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    pCate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    cate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    salePrice: {
        type: Number,
        required: true,
        min: 0
    },
    gallery: {
        type: [String],
        default: [],
        validate: {
            validator: Array.isArray,
            message: 'gallery must be an array of strings'
        }
    },
    shortDes: {
        type: shortDescriptionSchema,
        required: true
    },
    description: {
        type: [descriptionTextSchema],
        default: [],
        validate: {
            validator: Array.isArray,
            message: 'description must be an array of description texts'
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
