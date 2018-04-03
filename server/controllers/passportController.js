const db = require('../models/database');

const passportController = {};

//main set up for GH Strat
// checks to see if user currently has an account
//if they do use it
//else create a new account
passportController.loginUser = (accessToken, refreshToken, profile, done) => {
    console.log('hit passport github');
    console.log('myusername ', profile.username);

    // FIXME
    db.query(`SELECT "username" from "users" where "username" = '${profile.username}';`, (err, result) => {
        if (err) throw err;
        if (!result.rows[0]) {
            console.log('inside if statement in passportController');
            db.query(`INSERT into "users" ("username", avatar, vote_count, submission_count)
                VALUES ('${profile.username}', '${profile.photos[0].value}',${3}, ${1});`, (err, user) => {
                    if (err) console.log('Im the error from insert ' + err);
                    db.query(`SELECT * from "users" where "username" = '${profile.username}';`, (err, user) => {
                        done(null, user.rows[0].username);
                    });
                });
        } else {
            console.log('inside else statement in passportController');
            db.query(`SELECT * from "users" where "username" = '${profile.username}';`, (err, user) => {
                done(null, JSON.stringify(user.rows[0]));
            });
        }
    });
}

module.exports = passportController;