const router = require('express').Router();
const {auth} = require("../middlewares/auth");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const { GetAllOffers , AddOffer , DeleteOffer} = require('../controllers/offer');

router.get('/',GetAllOffers);

router.post('/',auth, upload.array("offer_images"),AddOffer);

router.delete('/:offerId',DeleteOffer);

module.exports = router;