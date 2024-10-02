const Cart = require('../models/cart');
const Product = require('../models/product');
const asyncHandler = require("express-async-handler");

const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};

const GetAllCartItems = asyncHandler(async (req, res) => {
    try {
        const {_id} = req.user;

        const cartProducts = await Cart.find({ user_id: _id })
            .populate('product_id')
            .exec();

        return res.status(200).json({
            status: 200,
            data: cartProducts
        });
    } catch (error) {
        console.error("Error fetching cart products: ", error);
        return handleErrorResponse(res, 'Failed to fetch cart products', 500, error);
    }
});

const GetSingleCartItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        const cartProduct = await Cart.findById(cartId).populate('product_id').exec();
        if (!cartProduct) {
            return handleErrorResponse(res, 'Cart item not found', 404);
        }

        return res.status(200).json({
            status: 200,
            data: cartProduct
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to fetch cart item', 500, error);
    }
});

const AddCartItem = asyncHandler(async (req, res) => {
    const { products } = req.body;
    const {_id} = req.user

    try {
        const newCartItem = await Cart.create({
            user_id: _id,
            products,
        });

        return res.status(201).json({
            status: 201,
            message: 'Product added to cart',
            data: newCartItem
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to add product to cart', 500, error);
    }
});

const EditCart = asyncHandler(async (req, res) => {
    const { products } = req.body;
    const { cartId } = req.params

    if (!products || !Array.isArray(products) || products.length === 0) {
        return handleErrorResponse(res, 'Cart items are required', 400);
    }

    try {

        const result = await Cart.findByIdAndUpdate(cartId, {products}, {new: true}).exec();

        return res.status(200).json({
            status: 200,
            message: 'Cart items updated successfully',
            data: result
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to update cart items', 500, error);
    }
});

const DeleteCartItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        const deletedCartItem = await Cart.findByIdAndDelete(cartId).exec();
        return res.status(200).json({
            status: 200,
            message: 'Product deleted successfully from cart',
            data: deletedCartItem
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to delete product from cart', 500, error);
    }
});

module.exports = {
    AddCartItem,
    EditCart,
    GetAllCartItems,
    GetSingleCartItem,
    DeleteCartItem
};
