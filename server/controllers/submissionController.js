const db = require('../models/database');

const submissionController = {};

submissionController.submitCode = (req, res) => {
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

}

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

