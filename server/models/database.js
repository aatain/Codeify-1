const { Pool } = require('pg');

//this needs to change to our new DB info
const USERA = 'bfwodfds';
const PASSA = 'i3jAAFygqniwDWxKnsysS93pOLFkW5EM';

const USERP = 'nonezrkp';
const PASSP = 'KDEL3uo4HAxPAmBfhTfKpfmP5rAK3wC0';

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
let db = new Pool(configP);

db.connect((err, result) => {
	if (err) throw new Error();
	else console.log(`Connected to the database...`);
});

module.exports = db;