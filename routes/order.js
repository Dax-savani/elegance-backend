const router = require('express').Router();
const {AddOrder, GetAllOrders, GetSingleOrder, EditOrder } = require('../controllers/order')

router.get('/',GetAllOrders);

router.get('/:orderId',GetSingleOrder);

router.post('/',AddOrder);

router.patch('/:orderId',EditOrder);

module.exports = router;