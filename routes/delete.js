var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/', (req, res, next) => {
  if (req.session.loggedin) {
    res.render('delete', { name: req.session.name, id: req.query.id });
  } else {
    res.render('login', {loginError: false});
  }
});

/*
* delete ToDo
 */

router.post('/', (req, res) => {
  const subject = req.body.subject;
  const description = req.body.description;

  if (req.session.loggedin) {
    if (req.query.id) {
      console.log('LLEGA', req.query.id);
      db.query('DELETE FROM todos WHERE id = ?', [req.query.id], function(error, results, fields) {
        console.log('Eliminado ToDo:', results);
        res.redirect('/index');
      });
    } else {
      res.render('delete', { name: req.session.name, id: req.query.id });
    }
  } else {
    res.render('login', {loginError: false});
  }
});


module.exports = router;
