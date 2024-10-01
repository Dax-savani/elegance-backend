const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};

const GetAllSubcategories = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const subcategories = await Subcategory.find({ category: categoryId }).populate("category");

        if (!subcategories || subcategories.length === 0) {
            return handleErrorResponse(res, 'No subcategories found for this category', 404);
        }

        return res.status(200).json({
            status: 200,
            data: subcategories
        });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to fetch subcategories', 500, err);
    }
});

const GetSingleSubcategory = asyncHandler(async (req, res) => {
    const { categoryId, subcategoryId } = req.params;

    try {
        const subcategory = await Subcategory.findOne({ _id: subcategoryId, category: categoryId }).populate("category");

        if (!subcategory) {
            return handleErrorResponse(res, 'Subcategory not found for this category', 404);
        }

        return res.status(200).json({
            status: 200,
            data: subcategory
        });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to fetch subcategory', 500, err);
    }
});

const AddSubcategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { subcategoryName } = req.body;

    if (!subcategoryName || !categoryId) {
        return handleErrorResponse(res, 'Subcategory name and category ID are required', 400);
    }

    try {
        const newSubcategory = await Subcategory.create({
            subcategoryName,
            category: categoryId
        });

        return res.status(201).json({
            status: 201,
            message: 'Subcategory created successfully',
            data: newSubcategory
        });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to create subcategory', 500, err);
    }
});

const UpdateSubcategory = asyncHandler(async (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    const { subcategoryName } = req.body;

    if (!subcategoryName || !categoryId) {
        return handleErrorResponse(res, 'Subcategory name and category ID are required', 400);
    }

    try {
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subcategoryId,
            { subcategoryName, category: categoryId },
            { new: true, runValidators: true }
        );

        if (!updatedSubcategory) {
            return handleErrorResponse(res, 'Subcategory not found', 404);
        }

        return res.status(200).json({
            status: 200,
            message: 'Subcategory updated successfully',
            data: updatedSubcategory
        });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to update subcategory', 500, err);
    }
});

const DeleteSubcategory = asyncHandler(async (req, res) => {
    const { subcategoryId, categoryId } = req.params;

    try {
        const deletedSubcategory = await Subcategory.findOneAndDelete({ _id: subcategoryId, category: categoryId });

        if (!deletedSubcategory) {
            return handleErrorResponse(res, 'Subcategory not found', 404);
        }

        return res.status(200).json({
            status: 200,
            message: 'Subcategory deleted successfully',
            data: deletedSubcategory
        });
    } catch (err) {
        return handleErrorResponse(res, 'Failed to delete subcategory', 500, err);
    }
});

module.exports = {
    GetAllSubcategories,
    GetSingleSubcategory,
    AddSubcategory,
    UpdateSubcategory,
    DeleteSubcategory
};
