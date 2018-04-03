const db = require('../models/database');

const submissionController = {};

submissionController.submitCode = (req, res) => {
    db.query(`INSERT INTO submissions (code, username, alg_id) VALUES ('${req.body.code}', '${req.body.username}', '${req.body.submitted_at}', '${req.body.alg_id}');`,
        (err, result) => {
            if (err) throw new Error(err);
            res.send('successfully posted');
        }
    );
};

//add method for displaying submissions
submissionController.displayCodeGallery = (req, res) => {
	// FIXME
	db.query(`SELECT "userName" FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT snackphoto FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT votes FROM snackify WHERE snackphoto IS NOT NULL;
							SELECT comments FROM snackify WHERE snackphoto IS NOT NULL;
							`, (err, result) => {
			const resultArr = [];
			const rows = result.map((col) => {
				return col.rows;
			})
			for (let i = 0; i < rows[0].length; i++) {
				const userObj = {};
				userObj.userName = rows[0][i];
				userObj.snackPhoto = rows[1][i];
				userObj.votes = rows[2][i];
				userObj.comments = rows[3][i];
				resultArr.push(userObj);
			}
			res.json(resultArr);
		});
}

module.exports = submissionController;

