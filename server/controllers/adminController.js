const db = require('../models/modelForAlg.js');

const adminController = {};

adminController.addAlg = (req, res) => {
    db.query(`INSERT INTO algorithms (alg_question) VALUES ('${req.body.question}');`,
        (err, result) => {
            if (err) throw new Error(err);
            res.send('successfully posted');
        }
    );
};



module.exports = adminController;