var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (req.session.loggedin) {
    db.query('SELECT * FROM todos WHERE id = ?', [req.query.id], function(error, results, fields) {
      console.log('ToDo recibido:', results);
      res.render('detail', { name: req.session.name, todo: results[0] });
    });
  } else {
    res.render('login', {loginError: false});
  }
});

module.exports = router;
