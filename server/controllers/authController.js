const passport = require('passport');

const authController = {};

authController.authenticate = passport.authenticate('github', {
	scope: ['profile']
});

authController.redirect = passport.authenticate('github'), (req, res) => {
	//user info is stored on req.user object
	console.log(req.user, '<== req.user from gh/redirect route');
	res.redirect('/');
};

authController.logout = (req, res) => {
    res.send('User has logged out');
}

module.exports = authController;