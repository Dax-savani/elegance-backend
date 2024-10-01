const {uploadFiles} = require('../helpers/productImage');
const asyncHandler = require("express-async-handler");
const OfferModel = require('../models/offer');

const GetAllOffers = asyncHandler(async (req, res) => {
    const offers = await OfferModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
        status: 'success',
        data: offers,
    });
})

const AddOffer = asyncHandler(async (req, res) => {
    const files = req.files;
    const fileBuffers = files.map(file => file.buffer);
    const imageUrls = await uploadFiles(fileBuffers);

    if (!imageUrls || imageUrls.length <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide at least 1 image',
        });
    }

    try {
        const offerData = imageUrls.map(url => ({ offer_images: url }));

        const insertedImages = await OfferModel.insertMany(offerData);

        return res.status(201).json({
            status: 'success',
            message: 'Images inserted successfully',
            data: insertedImages,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


const DeleteOffer = asyncHandler(async (req, res) => {
    const deletedOfferModel = await OfferModel.findByIdAndDelete(req.params.offerId);
    if (deletedOfferModel) {
        return res.json({message: "OfferModel removed", deletedOfferModel})
    } else {
        res.status(404);
        throw new Error('OfferModel not found');
    }
})


module.exports = { GetAllOffers , AddOffer , DeleteOffer}