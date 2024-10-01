const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const {
    handleGetCategoryById,
    handleGetCategories,
    handleUpdateCategory,
    handleDeleteCategory,
    handleCreateCategory
} = require('../controllers/category');

router.get('/', handleGetCategories);

router.get('/:categoryId', handleGetCategoryById);

router.post('/', auth, handleCreateCategory);

router.put('/:categoryId', auth, handleUpdateCategory);

router.delete('/:categoryId', auth, handleDeleteCategory);

module.exports = router;