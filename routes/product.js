const router = require('express').Router();
const {AddProduct, GetAllProducts, DeleteProduct, GetSingleProduct, EditProduct, BestSellingProduct} = require('../controllers/product');
const multer = require('multer');
const {auth} = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', GetAllProducts);
router.get('/:productId', GetSingleProduct);
router.get('/best-seller/product', BestSellingProduct);
router.post('/',auth, upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'gallery', maxCount: 5}
]), AddProduct);
router.put('/:productId',auth,upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'gallery', maxCount: 5}
]), EditProduct);
router.delete('/:productId',auth, DeleteProduct);



module.exports = router;