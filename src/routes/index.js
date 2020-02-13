const express = require('express');
const jwt = require('express-jwt');
const analyticRoutes = require('./analytics');
const loginRoute = require('./admin');
const homeRoute = require('./home');

const router = express.Router();

router.use(
    '/api', 
    jwt({
        secret: 'secretKey',
        credentialsRequired: false,
      }),
      homeRoute);
router.use('/api', loginRoute);
router.use(
  '/api',
  jwt({
    secret: 'secretKey',
  }),
  (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token');
    }
  },
  analyticRoutes,
);


module.exports = router;
 