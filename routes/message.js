var express = require('express');
var router = express.Router();

// import  User controllers
const controller = require('../controllers/message');

/* Country routes */
router.post('/', controller.createMessage);
router.get('/', controller.getAllMessages);
router.get('/:id', controller.getMessagesById);
router.post('/date/', controller.getMessagesByDate);
router.put('/:id', controller.updateMessage);
router.delete('/:id', controller.deleteMessage);

module.exports = router;