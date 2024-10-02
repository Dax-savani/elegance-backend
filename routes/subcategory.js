const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const {
    GetSingleSubcategory,
    GetAllSubcategories,
    GetAllSubcategoriesByCategory,
    UpdateSubcategory,
    DeleteSubcategory,
    AddSubcategory
} = require('../controllers/subcategory');

router.get('/:categoryId/subcategory', GetAllSubcategoriesByCategory);

router.get('/subcategory', GetAllSubcategories);

router.get('/:categoryId/subcategory/:subcategoryId', GetSingleSubcategory);

router.post('/:categoryId/subcategory', auth, AddSubcategory);

router.put('/:categoryId/subcategory/:subcategoryId', auth, UpdateSubcategory);

router.delete('/:categoryId/subcategory/:subcategoryId', auth, DeleteSubcategory);

module.exports = router;