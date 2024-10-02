const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryImage: String
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
