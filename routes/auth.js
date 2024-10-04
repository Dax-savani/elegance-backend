const express = require('express');
const { register ,login,me , userEdit} = require('../controllers/user');
const router = express.Router();
const {auth} = require("../middlewares/auth");

router.post('/register',register);

router.put('/',auth,userEdit);

router.get('/me',auth,me);

router.post('/login',login);

module.exports = router;
