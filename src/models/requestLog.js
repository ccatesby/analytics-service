const mongoose = require('mongoose');

let RequestLog = mongoose.model('RequestLog', {
    url: String,
    requestTime: String,
    browser: String,
    user: String,
});

module.exports = RequestLog;