const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
const asyncHandler = require("express-async-handler");

const handleGetWishlist = asyncHandler(async (req,res) => {
    const wishlistProducts = await Wishlist.find().populate('product_id');
    return res.json(wishlistProducts);
})

const handleAddWishlist = asyncHandler(async (req, res) => {
    const {product_id} = req.body;
    const findProduct = Product.findById(product_id);
    if(!findProduct) return  res.status(400).json({status:400,message: 'Product not found'});
    try {
        const newWishlist = await Wishlist.create({
            user_id: req.user._id,
            product_id,
        })
        return res.status(201).json({status: 201, message: 'Product added to Wishlist', data: newWishlist})
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Fail to add wishlist product',
            error: err.message
        })
    }
});

const handleDeleteWishlist = asyncHandler(async (req,res) => {
    try{
        const {wishlistId} = req.params;
        const wishlistProduct = await Wishlist.findById(wishlistId);
        if(!wishlistProduct) return res.status(404).json({status: 404,message: "Product not found"});

        const deletedProduct = await Wishlist.findByIdAndDelete(wishlistId);
        return res.status(200).json({status: 200,message: "Product removed successfully",data: deletedProduct});
    } catch(err){
        res.status(500).json({status:500,message: "Failed to delete Product",error: err.message});
        throw Error("Failed to delete Product");
    }
})

module.exports = {handleAddWishlist ,  handleGetWishlist  ,handleDeleteWishlist}