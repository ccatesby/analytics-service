const express = require('express');
const router = express.Router();

router.get('/home', function(req, res, next) {
  res.send('You visted The home Page');
});

module.exports = router;