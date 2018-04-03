const express = require('express');

const path = require('path');
const cors = require('cors');
const pg = require('pg');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passportSetup = require('./config/passport-setup');

const authRoutes = require('./routes/auth-routes');

const userController = require('./controllers/userController.js');
const submissionController = require('./controllers/submissionController.js');
	
const app = express();

const db = require('./models/database');

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	if (req.user) {
		res.sendFile(path.join(__dirname, '../public/index.html'));	
	}
	else res.redirect('/login');
});

app.post('/submission', submissionController.submitCode);

app.get('/gallery', submissionController.displayCodeGallery);

// DELETE
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/login.html'));
})

// app.get('/login', userController.login);

app.get('/currentUser', userController.getState);

app.listen(3000, () => console.log('Listening on port 3000...'));




