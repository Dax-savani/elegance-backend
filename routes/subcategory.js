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

router.post('/category/:categoryId/subcategory', auth, handleCreateSubcategory);

router.put('/category/:categoryId/subcategory/:subcategoryId', auth, handleUpdateSubcategory);

router.delete('/category/:categoryId/subcategory/:subcategoryId', auth, handleDeleteSubcategory);

module.exports = router;