const express = require('express');
const router = express.Router();

/* import  User controllers */
const controller = require('../controllers/company');

/* Company routes */
router.post('/', controller.createCompany);
router.get('/', controller.getAllCompanies);
router.get('/:id', controller.getCompanyById);
router.put('/:id', controller.updateCompany);
router.delete('/:id', controller.deleteCompany);

module.exports = router;