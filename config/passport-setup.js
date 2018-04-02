const passport = require('passport');
const googleAuth = require('passport-google-oauth20');
const githubStrat = require('passport-github');
const keys = require('./keys');
const pg = require('pg');


let user = 'ulurpczi';
let pass = 'TVQxxaVGcvh2ZFlNZHXaHReKN_3DfZbm';
let config = {
	host: "nutty-custard-apple.db.elephantsql.com",
	user: user,
	password: pass,
	database: user,
	post: 5432,
	ssl: true
}
//Generating pool API
let pool = new pg.Pool(config);
let db;

pool.connect((err, result) => {
	if (err) throw new Error(err);
	else console.log("Connecting to DB");
	db = result;
	//////////////////////////////////////////////
	passport.serializeUser((user, done) => {
		// maybe id if _id undefined
		// console.log(user+'<====serializer');
		done(null, user);
		// 'phillip
	})

	passport.deserializeUser((id, done) => {
		//find _id that matches id
		// console.log(id+'<=====deserializer');
		done(null, id);
	});

	//////////////////////////////////
	//main set up for GH Strat
	// checks to see if user currently has an account
		//if they do use it
		//else create a new account

	passport.use(
		new githubStrat({
			callbackURL: '/auth/github/redirect',
			clientID: keys.github.clientID,
			clientSecret: keys.github.clientSecret,
		}, (accessToken, refreshToken, profile, done) => {
			console.log('hit passport github');

			db.query(`SELECT "userName" from snackify where "userName" = '${profile.username}';`, (err, result) => {
				if (err) throw err;
				if (!result.rows[0]) {
					console.log('hit line 59');
					db.query(`INSERT into snackify ("userName", avatar, voteCount, submissionCount)
					VALUES ('${profile.username}', '${profile.photos[0].value}',${3}, ${1});`, (err, user) => {
							if (err) console.log('Im the error from insert ' + err);
							db.query(`SELECT * from snackify where "userName" = '${profile.username}';`, (err, user) => {
								done(null, user.rows[0].userName);
							});
						});
				} else {
					db.query(`SELECT * from snackify where "userName" = '${profile.username}';`, (err, user) => {
						done(null, JSON.stringify(user.rows[0]));
					});
				}
			});
}
));

})