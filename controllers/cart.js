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
    const { product_id, cartQuantity } = req.body;
    const {_id} = req.user

    if (!product_id || !cartQuantity) {
        return handleErrorResponse(res, 'Product ID and quantity are required', 400);
    }

    try {
        const product = await Product.findById(product_id).exec();
        if (!product) {
            return handleErrorResponse(res, 'Product not found', 404);
        }

        const existingCartItem = await Cart.findOne({ user_id: _id, product_id }).exec();
        if (existingCartItem) {
            return handleErrorResponse(res, 'Product is already in the cart', 400);
        }

        const newCartItem = await Cart.create({
            user_id: _id,
            product_id,
            cartQuantity
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
    const { cartId } = req.params;
    const { cartQuantity } = req.body;

    if (!cartQuantity) {
        return handleErrorResponse(res, 'Quantity is required', 400);
    }

    if (cartQuantity === 0) {
        try {
            const removedCartItem = await Cart.findByIdAndDelete(cartId).exec();
            if (!removedCartItem) {
                return handleErrorResponse(res, 'Cart item not found', 404);
            }

            return res.status(200).json({
                status: 200,
                message: 'Product removed from cart',
                data: removedCartItem
            });
        } catch (error) {
            return handleErrorResponse(res, 'Failed to remove product from cart', 500, error);
        }
    }

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(
            cartId,
            { cartQuantity },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedCartItem) {
            return handleErrorResponse(res, 'Cart item not found', 404);
        }

        return res.status(200).json({
            status: 200,
            message: 'Cart item updated successfully',
            data: updatedCartItem
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to update cart item', 500, error);
    }
});

const DeleteCartItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        const cartItem = await Cart.findById(cartId).exec();
        if (!cartItem) {
            return handleErrorResponse(res, 'Cart item not found', 404);
        }

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
