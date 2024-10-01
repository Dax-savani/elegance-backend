const Order = require('../models/order');
const Product = require('../models/product');
const asyncHandler = require("express-async-handler");

const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};

const GetAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find().populate('product_id').exec();
        return res.status(200).json({
            status: 200,
            data: orders
        });
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return handleErrorResponse(res, 'Failed to fetch orders', 500, error);
    }
});

const GetSingleOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId).populate('product_id').exec();
        if (!order) {
            return handleErrorResponse(res, 'Order not found', 404);
        }

        return res.status(200).json({
            status: 200,
            data: order
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to fetch the order', 500, error);
    }
});

const AddOrder = asyncHandler(async (req, res) => {
    const { product_id, qty, status } = req.body;

    try {
        const product = await Product.findById(product_id).exec();
        if (!product) {
            return handleErrorResponse(res, 'Product not found', 404);
        }

        if (!qty || qty < 1) {
            return handleErrorResponse(res, 'Quantity must be at least 1', 400);
        }

        const validStatuses = ['placed', 'processed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return handleErrorResponse(res, 'Invalid order status', 400);
        }

        const newOrder = await Order.create({
            user_id: req.user._id,
            product_id,
            qty,
            status
        });

        return res.status(201).json({
            status: 201,
            message: 'Order placed successfully',
            data: newOrder
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to place order', 500, error);
    }
});

const EditOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ['placed', 'processed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return handleErrorResponse(res, 'Invalid order status', 400);
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true }).exec();

        if (!updatedOrder) {
            return handleErrorResponse(res, 'Order not found', 404);
        }

        return res.status(200).json({
            status: 200,
            message: 'Order updated successfully',
            data: updatedOrder
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to update order', 500, error);
    }
});

module.exports = {
    AddOrder,
    GetAllOrders,
    GetSingleOrder,
    EditOrder
};
