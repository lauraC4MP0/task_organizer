var express = require('express');
var router = express.Router();
var db = require('./db');
var signUpError = false;

router.get('/', (req, res, next) => {
    res.render('signup', { signUpError: false });
});

router.post('/', (req, res) => {
    const userId = req.body.id;
    const mame = req.body.name;
    const email = req.body.email;
    if (id && name && email) {
        db.query('INSERT INTO todos (userId, name, email) VALUES (?,?,?) ', [userId, name, email], (err, results) => {
            if (err) throw err;
            res.redirect('/login');
        });

    } else {
        res.render('new', { userId: userId, error: true });
    }
});

module.exports = router;