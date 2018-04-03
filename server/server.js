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

// DELETE
// app.post('/submission', (req, res) => {
// 	db.query(`SELECT submissionCount from snackify where "userName" = '${req.body.userName}';`, (err, count) => {
// 		if (count.rows[0].submissioncount === 0) {
// 			res.send('You Eat Too Much');
// 		} else {
// 			db.query(`UPDATE snackify SET submissionCount = submissionCount -1 WHERE "userName" = '${req.body.userName}';
// 				  UPDATE snackify SET snackphoto = '${req.body.snackPhoto}' WHERE "userName" = '${req.body.userName}';
// 				  UPDATE snackify SET comments = '${req.body.comments}' WHERE "userName" = '${req.body.userName}';`,
// 				(err, result) => {
// 					if (err) throw new Error(err);
// 					res.send('successfully posted');
// 				});
// 		}
// 	});

// })

app.post('/submission', submissionController.submitCode);

// DELETE
// app.get('/gallery', (req, res) => {
// 	db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT snackphoto FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT votes FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
// 							`, (err, result) => {
// 			const resultArr = [];
// 			const rows = result.map((col) => {
// 				return col.rows;
// 			})
// 			for (let i = 0; i < rows[0].length; i++) {
// 				const userObj = {};
// 				userObj.userName = rows[0][i];
// 				userObj.snackPhoto = rows[1][i];
// 				userObj.votes = rows[2][i];
// 				userObj.comments = rows[3][i];
// 				resultArr.push(userObj);
// 			}
// 			res.json(resultArr);
// 		});
// });

app.get('/gallery', submissionController.displayCodeGallery);

//=================================================================

// DELETE
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/login.html'));
})

// app.get('/login', userController.login);

// DELETE BECAME USERCONTROLLER.GETSTATE
// app.get('/currentUser', (req, res) => {
// 	db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT snackphoto FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT votes FROM snackify WHERE snackphoto IS NOT NULL;
// 							SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
// 							`, (err, result) => {
// 			const resultArr = [];
// 			const rows = result.map((col) => {
// 				return col.rows;
// 			})
// 			for (let i = 0; i < rows[0].length; i++) {
// 				//should be entryObj not userObj
// 				const userObj = {};
// 				userObj.userName = rows[0][i].userName;
// 				userObj.snackPhoto = rows[1][i].snackphoto;
// 				userObj.votes = rows[2][i].votes;
// 				userObj.comments = rows[3][i].comments;
// 				resultArr.push(userObj);
// 			}
// 			req.user = JSON.parse(req.user);
// 			req.user.gallery = resultArr;
// 			res.json(req.user);
// 		});
// });
app.get('/currentUser', userController.getState);

// DELETE
// app.post('Populating Front End with stuff', (req, res) => {
// 	db.query(`UPDATE snackify SET submissionCount = submissionCount -1 WHERE '${req.user.userName}';
// 				  UPDATE snackify SET snackphoto = '${req.user.snackphoto} WHERE '${req.user.userName}';
// 				  UPDATE snackify SET comments = '${req.user.comments}' WHERE '${req.user.userName}'`,
// 		(err, result) => {
// 			if (err) {
// 				throw new Error(err)
// 			}
// 		});
// })


app.listen(3000, () => console.log('Listening on port 3000...'));




