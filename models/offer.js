const mongoose = require('mongoose');
const {Schema} = mongoose;

const offerSchema = new Schema({
    offer_images: [
        {
            type: String,
            required: true,
        }
    ]
},{timestamps: true});

module.exports = mongoose.model('Offer', offerSchema);