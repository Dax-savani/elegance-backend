const router = require('express').Router();
const {handleCreateProduct , handleGetProduct , handleDeleteProduct , handleGetSingleProduct , handleEditProduct} = require('../controllers/product');
const multer = require('multer');
const {auth} = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', handleGetProduct);
router.get('/:productId', handleGetSingleProduct);
router.post('/',auth, upload.array("product_images",5), handleCreateProduct);
router.put('/:productId',auth, upload.array("product_images",5), handleEditProduct);
router.delete('/:productId',auth, handleDeleteProduct);



module.exports = router;