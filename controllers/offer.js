const {uploadFiles} = require('../helpers/productImage');
const asyncHandler = require("express-async-handler");
const Offer = require('../models/offer');

const handleGetOffer = asyncHandler(async (req, res) => {
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
        status: 'success',
        data: offers,
    });
})

const handleAddOffer = asyncHandler(async (req, res) => {
    const files = req.files;
    const fileBuffers = files.map(file => file.buffer);
    const imageUrls = await uploadFiles(fileBuffers);  // Assuming this returns an array of URLs

    if (!imageUrls || imageUrls.length <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide at least 1 image',
        });
    }

    try {
        // As each `imageUrls` array element is a single string, map directly to the offer
        const offerData = imageUrls.map(url => ({ offer_images: url }));

        const insertedImages = await Offer.insertMany(offerData);

        return res.status(201).json({
            status: 'success',
            message: 'Images inserted successfully',
            data: insertedImages,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


const handleDeleteOffer = asyncHandler(async (req, res) => {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.offerId);
    if (deletedOffer) {
        return res.json({message: "Offer removed", deletedOffer})
    } else {
        res.status(404);
        throw new Error('Offer not found');
    }
})


module.exports = { handleGetOffer , handleAddOffer , handleDeleteOffer}