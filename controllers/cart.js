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

        const cartProducts = await Cart.find({ user: _id })
            .populate('product')
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
        const cartProduct = await Cart.findById(cartId).populate('product').exec();
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
    const { product, cartQuantity } = req.body;
    const {_id} = req.user

    if (!product || !cartQuantity) {
        return handleErrorResponse(res, 'Product and quantity are required', 400);
    }

    try {
        const productExist = await Product.findById(product).exec();
        if (!productExist) {
            return handleErrorResponse(res, 'Product not found', 404);
        }

        const existingCartItem = await Cart.findOne({ user: _id, product }).exec();
        if (existingCartItem) {
            return handleErrorResponse(res, 'Product is already in the cart', 400);
        }

        const newCartItem = await Cart.create({
            user: _id,
            product,
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
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ status: 400, message: "Cart items not found" });
    }

    try {
        const updates = cartItems.map(item => {
            if (item.cartQuantity === 0) {
                return Cart.deleteOne({ _id: item._id });
            } else {
                return Cart.updateOne(
                    { _id: item._id },
                    {
                        $set: {
                            product: item.product,
                            cartQuantity: item.cartQuantity
                        }
                    }
                );
            }
        });

        const result = await Promise.all(updates);


        return res.status(200).json({data: result, status: 200, message: "Cart details updated successfully" });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to update cart item', 500, err);
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
