const {Pool} = require('pg');

//this is my password and user
const USERA = 'bfwodfds';
const PASSA = 'i3jAAFygqniwDWxKnsysS93pOLFkW5EM';

let configA = {
	host: "baasu.db.elephantsql.com",
	user: USERA,
	password: PASSA,
	database: USERA,
	post: 5432,
	ssl: true
}

let db = new Pool(configA);

db.connect((err, result) => {
	if (err) throw new Error(err);
	else console.log("Connecting to DB...");
})

module.exports = db;