const router = require('express').Router();
const {
    AddWishlistItem,
    GetAllWishlistItems,
    DeleteWishlistItem
} = require('../controllers/wishlist')

router.get('/', GetAllWishlistItems);

router.post('/', AddWishlistItem);

router.delete('/:wishlistId', DeleteWishlistItem);

module.exports = router;