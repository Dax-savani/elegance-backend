const router = require('express').Router();
const {makePayment} = require('../controllers/payment')

router.post('/',makePayment);

module.exports = router;


