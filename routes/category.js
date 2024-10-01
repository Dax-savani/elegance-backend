const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const {
    GetAllCategories,
    GetSingleCategory,
    AddCategory,
    UpdateCategory,
    DeleteCategory
} = require('../controllers/category');

router.get('/', GetAllCategories);

router.get('/:categoryId', GetSingleCategory);

router.post('/', auth, AddCategory);

router.put('/:categoryId', auth, UpdateCategory);

router.delete('/:categoryId', auth, DeleteCategory);

module.exports = router;