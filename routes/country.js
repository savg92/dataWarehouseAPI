var express = require('express');
var router = express.Router();

// import  User controllers
const controller = require('../controllers/country');

/* Country routes */
router.post('/', controller.createCountry);
router.get('/', controller.getAllCountries);
router.get('/:id', controller.getCountryById);
router.put('/:id', controller.updateCountry);
router.delete('/:id', controller.deleteCountry);

module.exports = router;