const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const {
    GetSingleSubcategory,
    GetAllSubcategories,
    UpdateSubcategory,
    DeleteSubcategory,
    AddSubcategory
} = require('../controllers/subcategory');
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


router.get('/:categoryId/subcategory', GetAllSubcategories);

router.get('/:categoryId/subcategory/:subcategoryId', GetSingleSubcategory);

router.post('/:categoryId/subcategory', auth, upload.single('subcategory-image') ,AddSubcategory);

router.put('/:categoryId/subcategory/:subcategoryId', auth, UpdateSubcategory);

router.delete('/:categoryId/subcategory/:subcategoryId', auth, DeleteSubcategory);

module.exports = router;