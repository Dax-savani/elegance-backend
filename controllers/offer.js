const asyncHandler = require("express-async-handler");
const OfferModel = require('../models/offer');
const {uploadOffersImage} = require("../helpers/productImage");

async function handleFileUploads(files) {
    const offerImageUrls = files ? await Promise.all(files.map(async (e) => {
        const url = await uploadOffersImage(e.buffer);
        return url.trim();
    })) : [];

    return { offerImageUrls};
}


const GetAllOffers = asyncHandler(async (req, res) => {
    const offers = await OfferModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
        status: 'success',
        data: offers,
    });
})

const AddOffer = asyncHandler(async (req, res) => {
    const files = req.files;
    const { offerImageUrls} = await handleFileUploads(files);
    if (!offerImageUrls || offerImageUrls.length <= 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide at least 1 image',
        });
    }
    const offerImages = offerImageUrls.map((url) => ({ offer_images: url }));
    console.log("offerImages : ",offerImages)
    try {

        const insertedImages = await OfferModel.insertMany(offerImages);

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