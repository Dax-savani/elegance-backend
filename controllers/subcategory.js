const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');


const handleGetSubcategories = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    try {
        const subcategories = await Subcategory.find({ category: categoryId });
        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No subcategories found for this category'
            });
        }

        return res.status(200).json({
            status: 200,
            data: subcategories
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to fetch subcategories',
            error: err.message
        });
    }
});


const handleGetSubcategoryById = asyncHandler(async (req, res) => {
    const { categoryId, subcategoryId } = req.params;

    try {
        const subcategory = await Subcategory.findOne({
            _id: subcategoryId,
            category: categoryId
        });

        if (!subcategory) {
            return res.status(404).json({
                status: 404,
                message: 'Subcategory not found for this category'
            });
        }

        return res.status(200).json({
            status: 200,
            data: subcategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to fetch subcategory',
            error: err.message
        });
    }
});



const handleCreateSubcategory = asyncHandler(async (req, res) => {
    const { subcategoryName, category } = req.body;

    if (!subcategoryName || !category) {
        return res.status(400).json({
            status: 400,
            message: 'Subcategory name and category are required'
        });
    }

    try {

        const findedCategory = await Category.findById(category);
        if (!findedCategory) {
            return res.status(404).json({
                status: 404,
                message: 'Category not found'
            });
        }

        const newSubcategory = await Subcategory.create({
            subcategoryName,
            category
        });

        return res.status(201).json({
            status: 201,
            message: 'Subcategory created successfully',
            data: newSubcategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to create subcategory',
            error: err.message
        });
    }
});


const handleUpdateSubcategory = asyncHandler(async (req, res) => {
    const { subcategoryId } = req.params;
    const { subcategoryName, category } = req.body;

    if (!subcategoryName || !category) {
        return res.status(400).json({
            status: 400,
            message: 'Subcategory name and category are required'
        });
    }

    try {

        const findedCategory = await Category.findById(category);
        if (!findedCategory) {
            return res.status(404).json({
                status: 404,
                message: 'Category not found'
            });
        }

        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subcategoryId,
            { subcategoryName, category },
            { new: true, runValidators: true }
        );

        if (!updatedSubcategory) {
            return res.status(404).json({
                status: 404,
                message: 'Subcategory not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Subcategory updated successfully',
            data: updatedSubcategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to update subcategory',
            error: err.message
        });
    }
});


const handleDeleteSubcategory = asyncHandler(async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
        if (!deletedSubcategory) {
            return res.status(404).json({
                status: 404,
                message: 'Subcategory not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Subcategory deleted successfully',
            data: deletedSubcategory
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Failed to delete subcategory',
            error: err.message
        });
    }
});

module.exports = {
    handleGetSubcategories,
    handleGetSubcategoryById,
    handleCreateSubcategory,
    handleUpdateSubcategory,
    handleDeleteSubcategory
};
