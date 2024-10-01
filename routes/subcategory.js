const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const {
    handleGetSubcategoryById,
    handleGetSubcategories,
    handleUpdateSubcategory,
    handleDeleteSubcategory,
    handleCreateSubcategory
} = require('../controllers/subcategory');

router.get('/category/:categoryId/subcategory', handleGetSubcategories);

router.get('/category/:categoryId/subcategory/:subcategoryId', handleGetSubcategoryById);

router.post('/', auth, handleCreateSubcategory);

router.put('/:subcategoryId', auth, handleUpdateSubcategory);

router.delete('/:subcategoryId', auth, handleDeleteSubcategory);

module.exports = router;