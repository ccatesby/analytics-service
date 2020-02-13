var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('You visted The home Page');
});

module.exports = router;