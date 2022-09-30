const express = require('express');
const router = express.Router();

/* import ContactChannel controllers */
const controller = require('../controllers/contactChannel');

/* ContactChannel routes */
router.post('/', controller.createContactChannel);
router.get('/', controller.getAllContactChannels);
router.get('/:id', controller.getContactChannelById);
router.put('/:id', controller.updateContactChannel);
router.delete('/:id', controller.deleteContactChannel);

module.exports = router;