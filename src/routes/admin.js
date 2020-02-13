const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/login', function(req, res, next) {
    let token = jwt.sign({ id: 'test', username: 'test' }, 'secretKey', { expiresIn: 129600 }); 
        res.json({
            sucess: true,
            err: null,
            token
        });
  });


  module.exports = router;