const mongoose = require('mongoose');
const config = require('../../config');

let RequestLog = mongoose.model(config.mongo.collectionName, {
    hostName: String,
    pagePath: String,
    requestTime: Number,
    browser: String,
    userId: String,
    sessionId: String,
    country: String,
});

module.exports = RequestLog;