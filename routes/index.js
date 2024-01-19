var express = require('express');
var router = express.Router();

// import  auth controllers
const controller = require('../controllers/auth');

router.post('/login', controller.loginUsers);
router.post('/register', controller.createUser);
router.delete('/logout', controller.logOut);

module.exports = router;
