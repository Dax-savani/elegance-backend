const mongoose = require("mongoose");
const { Schema } = mongoose;

// const colorAttributeSchema = new Schema({
//     color: {
//         type: String,
//         required: true
//     },
//     img: {
//         type: String,
//         required: true
//     }
// }, { _id: false });

const shortDescriptionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    listItem: {
        type: [String],
        required: true
    }
}, { _id: false });

const descriptionTextSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { _id: false });

const descriptionListSchema = new Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { _id: false });

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    pCate: {
        type: String,
        required: true
    },
    cate: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    gallery: {
        type: [String],
        required: false
    },
    shortDes: {
        type: shortDescriptionSchema,
        required: true
    },
    description: {
        textDesc: {
            type: [descriptionTextSchema],
            required: false
        },
        listDesc: {
            type: [descriptionListSchema],
            required: false
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
