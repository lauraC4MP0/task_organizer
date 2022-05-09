var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.loggedin) {
    db.query('SELECT * FROM todos WHERE userId = ?', [req.session.userId], function(error, results, fields) {
      console.log('Resultado lista:', results);
      res.render('index', { name: req.session.name, todos: results });
    });
  } else {
    res.render('login', {loginError: false});
  }
});

module.exports = router;
