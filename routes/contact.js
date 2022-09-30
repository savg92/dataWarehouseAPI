const express = require('express');
const router = express.Router();

/* import Contact controllers */
const controller = require('../controllers/contact');


/* Contact routes */
router.post('/', controller.createContact);
router.get('/', controller.getAllContacts);
router.get('/:id', controller.getContactById);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;