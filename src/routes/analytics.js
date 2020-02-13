const express = require('express');
const router = express.Router();

router.get('/views', function(req, res, next) {
    var id = req.query.id;
    var countries = req.query.countries;
    var browser = req.query.browser;
    res.send({browser, countries, id});
  });
 

  module.exports = router;