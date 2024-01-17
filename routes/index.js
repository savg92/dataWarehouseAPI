var express = require('express');
var router = express.Router();

// import  auth controllers
const controller = require('../controllers/auth');

/* GET home page. */
router.get('/a', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.cookie('token', 'Bearer token', {
		httpOnly: true,
		secure: true,
		maxAge: 60 * 30,
		path: '/',
		SameSite: 'None',
	});
  // res.cookie('name', 'express');
  res.send('This is root!')
});

router.post('/login', controller.loginUsers);
router.post('/register', controller.createUser);
router.delete('/logout', controller.logOut);

module.exports = router;
