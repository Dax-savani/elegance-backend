const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
const asyncHandler = require("express-async-handler");

const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};

const GetAllWishlistItems = asyncHandler(async (req, res) => {
    try {
        const {_id} = req.user
        const wishlistProducts = await Wishlist.find({ user_id: _id })
            .populate('product_id')
            .exec();
        return res.status(200).json({
            status: 200,
            data: wishlistProducts
        });
    } catch (error) {
        console.error("Error fetching wishlist products: ", error);
        return handleErrorResponse(res, 'Failed to fetch wishlist products', 500, error);
    }
});

const AddWishlistItem = asyncHandler(async (req, res) => {
    const { product_id } = req.body;

    try {
        const product = await Product.findById(product_id).exec();
        if (!product) {
            return handleErrorResponse(res, 'Product not found', 404);
        }

        const existingWishlistItem = await Wishlist.findOne({ user_id: req.user._id, product_id }).exec();
        if (existingWishlistItem) {
            return handleErrorResponse(res, 'Product is already in wishlist', 400);
        }

        const newWishlistItem = await Wishlist.create({
            user_id: req.user._id,
            product_id
        });

        return res.status(201).json({
            status: 201,
            message: 'Product added to Wishlist',
            data: newWishlistItem
        });
    } catch (error) {
        console.error("Error adding product to wishlist: ", error);
        return handleErrorResponse(res, 'Failed to add product to wishlist', 500, error);
    }
});

const DeleteWishlistItem = asyncHandler(async (req, res) => {
    const { wishlistId } = req.params;

    try {
        const wishlistProduct = await Wishlist.findById(wishlistId).exec();
        if (!wishlistProduct) {
            return handleErrorResponse(res, 'Wishlist item not found', 404);
        }

        const deletedProduct = await Wishlist.findByIdAndDelete(wishlistId).exec();
        return res.status(200).json({
            status: 200,
            message: 'Product removed from Wishlist',
            data: deletedProduct
        });
    } catch (error) {
        console.error("Error deleting wishlist product: ", error);
        return handleErrorResponse(res, 'Failed to remove product from wishlist', 500, error);
    }
});

module.exports = {
    AddWishlistItem,
    GetAllWishlistItems,
    DeleteWishlistItem
};
