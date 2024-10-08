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
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/:categoryId/subcategory', GetAllSubcategoriesByCategory);

router.get('/subcategory', GetAllSubcategories);

router.get('/:categoryId/subcategory/:subcategoryId', GetSingleSubcategory);

router.post('/:categoryId/subcategory', auth, upload.single('subcategory-image') ,AddSubcategory);

router.put('/:categoryId/subcategory/:subcategoryId', auth, upload.single('subcategory-image'), UpdateSubcategory);

router.delete('/:categoryId/subcategory/:subcategoryId', auth, DeleteSubcategory);

module.exports = router;