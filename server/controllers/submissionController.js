const db = require('../models/modelForAlg.js');

const submissionController = {};

submissionController.submitCode = (req, res) => {
    db.query(`INSERT INTO submissions (code, username, submitted_at, alg_id) VALUES ('${req.body.code}', '${req.body.username}', '${req.body.submitted_at}', '${req.body.alg_id}');`,
        (err, result) => {
            if (err) throw new Error(err);
            res.send('successfully posted');
        }
    );
};

//add method for displaying submissions

module.exports = submissionController;