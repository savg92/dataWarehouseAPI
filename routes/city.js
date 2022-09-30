const express = require('express');
const router = express.Router();

/* import  User controllers */
const controller = require('../controllers/city');

/* City routes */
router.post('/', controller.createCity);
router.get('/', controller.getAllCities);
router.get('/:id', controller.getCityById);
router.put('/:id', controller.updateCity);
router.delete('/:id', controller.deleteCity);

module.exports = router;