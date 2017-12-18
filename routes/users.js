var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  queries.addUser(req.body)
    .then(function(id) {
      req.session.userId = id;
      res.redirect('/dashboard');
    })
    .catch(function(err) {
      next(err);
    });
});

router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  queries.getUserByName(username)
    .then(function(user) {
      if(!user) return res.redirect('/');

      if(user.password === password) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
      } else {
        res.redirect('/');
      }
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/logout', function(req, res, next) {
  req.session.userId = null;
  res.redirect('/');
})

module.exports = router;
