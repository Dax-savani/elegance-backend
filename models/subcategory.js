const mongoose = require('mongoose');
const {Schema} = mongoose;

const subcategorySchema = new Schema({
    subcategoryName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    subCategoryImage: String
}, { timestamps: true })

module.exports = mongoose.model("Subcategory", subcategorySchema);