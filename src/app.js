
const router = require('./routes');
const express = require('express');
const useragent = require('express-useragent');
const RequestLog = require('./models/requestLog');
const port = 3000;
const app = express();

require('mongoose').connect('mongodb://localhost:27017/analytics', { useNewUrlParser: true, useUnifiedTopology: true });
require('dotenv').config();

const startServer = async () => {
    try {
        app.use((req, res, next) => {
            res.on('finish', () => {
                RequestLog.create({
                    browser: useragent.parse(req.headers['user-agent']).browser,
                    url: req.path,
                    requestTime: Date.now(),
                    user: req.user && req.user.id || null,
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
      