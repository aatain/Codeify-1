const path = require('path');

const db = require('../models/database');

const userController = {};

// userController.login = (req, res) => {
//     res.sendFile(path.join(__dirname, 'login.html'));
// };

userController.getState = (req, res) => {
    // FIXME
    // console.log("username", req.user);
    // db.query(`SELECT "username" FROM "users" WHERE snackphoto IS NOT NULL;
    // 		  SELECT snackphoto FROM "users" WHERE snackphoto IS NOT NULL;
    // 		  SELECT votes FROM "users" WHERE snackphoto IS NOT NULL;
    // 		  SELECT comments FROM "users" WHERE snackphoto IS NOT NULL;`, (err, result) => {
    //               if (err) console.warn(err);
    //         const resultArr = [];
    //         const rows = result.map((col) => {
    //             return col.rows;lo
    //         });
    //         for (let i = 0; i < rows[0].length; i++) {
    //             //should be entryObj not userObj
    //             const userObj = {};
    //             userObj.userName = rows[0][i].userName;
    //             userObj.snackPhoto = rows[1][i].snackphoto;
    //             userObj.votes = rows[2][i].votes;
    //             userObj.comments = rows[3][i].comments;
    //             resultArr.push(userObj);
    //         }
    //         req.user = JSON.parse(req.user);
    //         req.user.gallery = resultArr;
    //         res.json(req.user);
    //     }
    // );

    // db.query(`SELECT "username" FROM "users" WHERE snackphoto IS NOT NULL;
	// 		  SELECT snackphoto FROM "users" WHERE snackphoto IS NOT NULL;
	// 		  SELECT votes FROM "users" WHERE snackphoto IS NOT NULL;
	// 		  SELECT comments FROM "users" WHERE snackphoto IS NOT NULL;`, (err, result) => {
    //         if (err) console.warn(err);
            const resultArr = [];
    //         const rows = result.map((col) => {
    //             return col.rows;
    //         });
            // for (let i = 0; i < rows[0].length; i++) {
            //     //should be entryObj not userObj
            //     const userObj = {};
            //     userObj.userName = rows[0][i].userName;
            //     userObj.snackPhoto = rows[1][i].snackphoto;
            //     userObj.votes = rows[2][i].votes;
            //     userObj.comments = rows[3][i].comments;
            //     resultArr.push(userObj);
            // }
            req.user = JSON.parse(req.user);
            req.user.gallery = resultArr;
            res.json(req.user);
        // }
    // );
};

module.exports = userController;