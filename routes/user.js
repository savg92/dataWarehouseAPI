var express = require('express');
var router = express.Router();

// import  User controllers
const controller = require('../controllers/user');

/* User routes */
// router.post('/register', controller.createUser);
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
