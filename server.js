const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const path = require('path');
const cors = require('cors');
const pg = require('pg');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use('/build', express.static(path.join(__dirname, 'build')));
// app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());


//this needs to change to our new DB info
const USERA = 'bfwodfds';
const PASSA = 'i3jAAFygqniwDWxKnsysS93pOLFkW5EM';

const USERP = 'nonezrkp';
const PASSP = 'uSy4WratNKiX3R3KWQYorHkU6I6xQI7-';

let configA = {
	host: "baasu.db.elephantsql.com",
	user: USERA,
	password: PASSA,
	database: USERA,
	post: 5432,
	ssl: true
}

let configP = {
	host: "stampy.db.elephantsql.com",
	user: USERP,
	password: PASSP,
	database: USERP,
	post: 5432,
	ssl: true
}

//Generating pool API
let pool = new pg.Pool(configA);
let db;

pool.connect((err, result) => {
	if (err) throw new Error(err);
	else console.log("Connecting to DB...");
	db = result;

	app.use('/auth', authRoutes);


	////////////////
	//////home/////
	///////////////

	app.get('/', (req, res) => {
		if (req.user) res.sendFile(path.join(__dirname, 'index.html'));
		else res.redirect('/login');
	});

	app.post('/submission', (req, res) => {
		db.query(`SELECT submissionCount from snackify where "userName" = '${req.body.userName}';`, (err, count) => {
			if (count.rows[0].submissioncount === 0) {
				res.send('You Eat Too Much');
			} else {
				db.query(`UPDATE snackify SET submissionCount = submissionCount -1 WHERE "userName" = '${req.body.userName}';
				  UPDATE snackify SET snackphoto = '${req.body.snackPhoto}' WHERE "userName" = '${req.body.userName}';
				  UPDATE snackify SET comments = '${req.body.comments}' WHERE "userName" = '${req.body.userName}';`,
					(err, result) => {
						if (err) throw new Error(err);
						res.send('successfully posted');
					});
			}
		});

	})

	app.get('/gallery', (req, res) => {
		db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT snackphoto FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT votes FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
							`, (err, result) => {
								const resultArr = [];
								const rows = result.map((col) => {
									return col.rows;
								})
								for(let i = 0 ; i < rows[0].length; i++){
										const userObj = {};
										userObj.userName = rows[0][i];
										userObj.snackPhoto = rows[1][i];
										userObj.votes = rows[2][i];
										userObj.comments = rows[3][i];
										resultArr.push(userObj);
								}
								res.json(resultArr);
			});
	})

	//=================================================================

	app.get('/login', (req, res) => {
		res.sendFile(path.join(__dirname, 'login.html'));
	})

	app.get('/currentUser', (req, res) => {
		db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT snackphoto FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT votes FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
							`, (err, result) => {
								const resultArr = [];
								const rows = result.map((col) => {
									return col.rows;
								})
								for(let i = 0 ; i < rows[0].length; i++){
									//should be entryObj not userObj
										const userObj = {};
										userObj.userName = rows[0][i].userName;
										userObj.snackPhoto = rows[1][i].snackphoto;
										userObj.votes = rows[2][i].votes;
										userObj.comments = rows[3][i].comments;
										resultArr.push(userObj);
								}
								req.user = JSON.parse(req.user);
								req.user.gallery = resultArr;
								res.json(req.user);
			});
	});


	app.post('Populating Front End with stuff', (req, res) => {
		db.query(`UPDATE snackify SET submissionCount = submissionCount -1 WHERE '${req.user.userName}';
				  UPDATE snackify SET snackphoto = '${req.user.snackphoto} WHERE '${req.user.userName}';
				  UPDATE snackify SET comments = '${req.user.comments}' WHERE '${req.user.userName}'`,
			(err, result) => {
				if (err) {
					throw new Error(err)
				}
			});
	})


	app.listen(3000, () => {
		console.log('listening on port 3000...');
	});
})



