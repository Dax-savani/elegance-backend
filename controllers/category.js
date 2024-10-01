const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};

const GetAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    return res.status(200).json({
        status: 200,
        data: categories
    });
});

const GetSingleCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
        return handleErrorResponse(res, 'Category not found', 404);
    }

    return res.status(200).json({
        status: 200,
        data: category
    });
});

const AddCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return handleErrorResponse(res, 'Category name is required', 400);
    }

    const newCategory = await Category.create({ categoryName });
    return res.status(201).json({
        status: 201,
        message: 'Category created successfully',
        data: newCategory
    });
});

const UpdateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) {
        return handleErrorResponse(res, 'Category name is required', 400);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { categoryName },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        return handleErrorResponse(res, 'Category not found', 404);
    }

    return res.status(200).json({
        status: 200,
        message: 'Category updated successfully',
        data: updatedCategory
    });
});

const DeleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        return handleErrorResponse(res, 'Category not found', 404);
    }

    return res.status(200).json({
        status: 200,
        message: 'Category deleted successfully',
        data: deletedCategory
    });
});

module.exports = {
    GetAllCategories,
    GetSingleCategory,
    AddCategory,
    UpdateCategory,
    DeleteCategory
};
