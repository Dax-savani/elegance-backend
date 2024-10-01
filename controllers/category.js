const Category = require('../models/category');
const asyncHandler = require("express-async-handler");


const handleGetCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json({
            status: 200,
            data: categories
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to fetch categories',
            error: err.message
        });
    }
});


const handleGetCategoryById = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Category not found'
            });
        }

        return res.status(200).json({
            status: 200,
            data: category
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to fetch category',
            error: err.message
        });
    }
});


const handleCreateCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;

    if (!categoryName) {
        return res.status(400).json({
            status: 400,
            message: 'Category name is required'
        });
    }

    try {
        const newCategory = await Category.create({ categoryName });

        return res.status(201).json({
            status: 201,
            message: 'Category created successfully',
            data: newCategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to create category',
            error: err.message
        });
    }
});

const handleUpdateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { categoryName },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                status: 404,
                message: 'Category not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Category updated successfully',
            data: updatedCategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to update category',
            error: err.message
        });
    }
});

const handleDeleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({
                status: 404,
                message: 'Category not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Category deleted successfully',
            data: deletedCategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to delete category',
            error: err.message
        });
    }
});

module.exports = {
    handleGetCategories,
    handleGetCategoryById,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory
};
