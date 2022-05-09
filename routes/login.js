var express = require('express');
var router = express.Router();
var db = require('./db');

var loginError = false;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login', {loginError: false});
});

/*
* auth system
 */

router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  if (name && email) {
    db.query('SELECT * FROM users WHERE name = ? AND email = ?', [name, email], function(error, results, fields) {
      console.log('Resultado:', results);
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.name = name;
        req.session.userId = results[0].id;
        res.redirect('/index');
      } else {
        res.render('login', {loginError: true});
      }
      res.end();
    });
  } else {
    res.render('login', {loginError: true});
    res.end();
  }
});

module.exports = router;

