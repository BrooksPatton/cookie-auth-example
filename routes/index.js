var express = require('express');
var queries = require('../db/queries');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.userId);
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  const userId = req.session.userId;

  if(!userId) return res.redirect('/');

  queries.getUserById(userId)
    .then(function(user) {
      if(!user) return res.redirect('/');

      res.render('dashboard', {user});
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
