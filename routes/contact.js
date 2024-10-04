const router = require('express').Router();
const { auth } = require("../middlewares/auth");
const { GetAllContacts, GetSingleContact, AddContact, EditContact } = require('../controllers/contact');

router.get('/', auth, GetAllContacts);

router.get('/:contactId', auth, GetSingleContact);

router.post('/', AddContact);

router.put('/:contactId', auth, EditContact);

module.exports = router;
