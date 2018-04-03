const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

//need to build this page...
// router.get('/login', (req, res) => {
// 	res.send('login');
// })

// DELETE
// router.get('/github', passport.authenticate('github', {
// 	scope: ['profile']
// }));

router.get('/github', authController.authenticate);

// DELETE
//STOP!!!
// router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
// 	//user info is stored on req.user object
// 	console.log(req.user, '<== req.user from gh/redirect route');
// 	res.redirect('/');
// });

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
	//user info is stored on req.user object
	console.log(req.user, '<== req.user from gh/redirect route');
	res.redirect('/');
});

//need to build this page ...
// DELETE
// router.get('/logout', (req, res) => {
// 	res.send('logged out');
// })

router.get('/logout', authController.logout);

module.exports = router;