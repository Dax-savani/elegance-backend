const router = require('express').Router();
const {AddCartItem , EditCart , GetAllCartItems ,GetSingleCartItem ,DeleteCartItem} = require('../controllers/cart')

router.get('/',GetAllCartItems);

router.get('/:cartId',GetSingleCartItem);

router.post('/',AddCartItem);

router.put('/',EditCart);

router.delete('/:cartId',DeleteCartItem);


module.exports = router;