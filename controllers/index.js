const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const Sequelize = require('sequelize');

router.get('/', (req, res) => res.send('This is root!').)

module.exports = router;