const router = require('express').Router();
const {handleAddWishlist, handleGetWishlist, handleDeleteWishlist} = require('../controllers/wishlist')

router.get('/', handleGetWishlist);

router.post('/', handleAddWishlist);

router.delete('/:wishlistId', handleDeleteWishlist);

module.exports = router;