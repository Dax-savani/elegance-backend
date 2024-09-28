const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const {handleGetOffer , handleAddOffer , handleDeleteOffer} = require('../controllers/offer');

router.get('/',handleGetOffer);

// router.get('/:orderId',handleGetSingleOrder);
//
router.post('/',auth, upload.array("offer_images"),handleAddOffer);
//
router.delete('/:offerId',handleDeleteOffer);

module.exports = router;