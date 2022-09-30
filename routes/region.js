var express = require('express');
var router = express.Router();

const controller = require('../controllers/region');

router.post('/', controller.createRegion);
router.get('/', controller.getAllRegions);
router.get('/:id', controller.getRegionById);
router.put('/:id', controller.updateRegion);
router.delete('/:id', controller.deleteRegion);

module.exports = router;