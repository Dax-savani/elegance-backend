const mongoose = require('mongoose');
const {Schema} = mongoose;

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    // category: {
    //     type: String,
    //     ref: 'Category',
    //     required: true
    // },
}, { timestamps: true })

module.exports = mongoose.model("Subcategory", subcategorySchema);