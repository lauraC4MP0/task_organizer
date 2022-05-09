var express = require('express');
var router = express.Router();
var db = require('./db');

var loginError = false;

/* GET new form */
router.get('/', (req, res, next) => {
  if (req.session.loggedin) {
    res.render('new', { name: req.session.name, error: false });
  } else {
    res.render('login', {loginError: false});
  }
});

/*
* add system
 */

router.post('/', (req, res) => {
  const subject = req.body.subject;
  const description = req.body.description;

  if (req.session.loggedin) {
    if (subject && description) {
      db.query('INSERT INTO todos (userId, subject, description) VALUES (?, ?, ?)', [req.session.userId, subject, description], (err, results) => {
        if(err) throw err;

        res.redirect('/index');
      });
    } else {
      res.render('new', { name: req.session.name, error: true });
    }
  } else {
    res.render('login', {loginError: false});
  }
});

module.exports = router;

