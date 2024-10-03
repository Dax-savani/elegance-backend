const mongoose = require("mongoose");
const {Schema} = mongoose;


const shortDescriptionSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    listItem: {
        type: [String],
        required: true
    }
}, {_id: false});

const descriptionTextSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {_id: false});


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
        required: true,
        ref: "Category"
    },
    cate: {
        type: String,
        required: true,
        ref: "Subcategory"
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    gallery: {
        type: [String],
        required: false
    },
    shortDes: {
        type: {shortDescriptionSchema},
        required: true
    },
    description: {
        type: [descriptionTextSchema],
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
