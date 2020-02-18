
const router = require('./routes');
const express = require('express');
const useragent = require('express-useragent');
const RequestLog = require('./models/RequestLog');
const port = 3000;
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
const config = require('../config');

require('mongoose').connect(`${config.mongo.host}/${config.mongo.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
require('dotenv').config();

const startServer = async () => {
    try {
        app.use(cookieParser());
        app.use(session({secret: "test"}));

        app.use((req, res, next) => {

            res.on('finish', () => {
                if (req.path === '/api/analytics' || req.path === '/analytics') {
                    return;
                }
                //Collect Page Views.
                RequestLog.create({
                    browser: useragent.parse(req.headers['user-agent']).browser,
                    pagePath: req.path,
                    hostName: req.hostname,
                    requestTime: Date.now(),
                    userId: req.user && req.user.id || null,
                    sessionId: req.session.id,
                    country: 'en-gb'
                });
            });
            next();
        });

        app.use(router);
    
        await app.listen(port, () => console.log('App running on port', port));
    } catch (error) {
        console.log(error.message);
    }
};
    
startServer();
      