const router = require('express').Router();
const {handleCreateProduct , handleGetProduct , handleDeleteProduct , handleGetSingleProduct , handleEditProduct} = require('../controllers/product');
const multer = require('multer');
const {auth} = require("../middlewares/auth");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', handleGetProduct);
router.get('/:productId', handleGetSingleProduct);
router.post('/',auth, upload.fields([
    {name: 'thumbnail', maxCount: 1},
    {name: 'gallery', maxCount: 5}
]), handleCreateProduct);
// router.put('/:productId',auth,upload.fields([
//     {name: 'thumbnail', maxCount: 1},
//     {name: 'gallery', maxCount: 5}
// ]), handleEditProduct);
router.delete('/:productId',auth, handleDeleteProduct);



module.exports = router;