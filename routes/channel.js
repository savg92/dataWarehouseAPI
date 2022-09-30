const express = require('express');
const router = express.Router();

/* import controllers */
const controller = require('../controllers/channel');

/* Channel routes */
router.post('/', controller.createChannel);
router.get('/', controller.getAllChannels);
router.get('/:id', controller.getChannelById);
router.put('/:id', controller.updateChannel);
router.delete('/:id', controller.deleteChannel);

module.exports = router;