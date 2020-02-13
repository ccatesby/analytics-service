let mongoose = require('mongoose');

let RequestLog = mongoose.model('RequestLog', {
    url: String,
    requestTime: String,
    browser: String,
});

module.exports = RequestLog;