var express = require('express');
var router = express.Router();

// import  auth controllers
const controller = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('This is root!')
});

router.post('/login', controller.loginUsers);
router.delete('/logout', controller.logOut);
router.post('/register', controller.createUser);

module.exports = router;
