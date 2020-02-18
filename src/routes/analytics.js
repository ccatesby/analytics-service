const express = require('express');
const router = express.Router();
const RequestLog = require('../models/RequestLog');

  router.get('/analytics', function(req, res, next) {
    const {query : {country, browser, startDate, endDate, pagePath }}  = req;

    var query = [];
    var fullquery = {};

    //TODO: Find more elegant way of doing this (Rambda library possibily.)
    if (pagePath) {
        var pagePaths = Array.isArray(pagePath) ? pagePath : [pagePath];
        query.push({pagePath: { $in: pagePaths }})
    }
    if (browser) {
        var browsers = Array.isArray(browser) ? browser : [browser];
        query.push({browser: { $in: browsers }})
    }
    if (country) {
        var countries = Array.isArray(country) ? country : [country];
        query.push({country: { $in: countries }})
    }
    if (endDate) {
        query.push({requestTime: {$lt: parseInt(endDate)}})
    }
    if (startDate) {
        query.push({requestTime: {$gte: parseInt(startDate)}})
    }
    if (query.length) {
        fullquery = { $and: query};
    }
    
    RequestLog.aggregate( 
            [{ $match: fullquery},
                { "$facet": {
                    "totalCount": [
                        { "$count": "count" }
                    ],
                    "Countries": [{"$group" : {_id:"$country", count:{$sum:1}}}],
                    "Browsers": [{"$group" : {_id:"$browser", count:{$sum:1}}}],
                    "TotalUsers": [{"$group" : {_id:"$sessionId", count:{$sum:1}}},
                            {$group: {_id: null, total: {$sum: 1}}},
                        ],
                    "ReturnUsers": [{"$group" : {_id:"$sessionId", count:{$sum:1}}},
                        {$match : {$and : [{"count" :{ $gt : 1}}]}},
                        {$group: {_id: null, total: {$sum: 1}}},
                    ],
                }},
          { 
            "$project": {
            "countries": "$Countries",
            "pagePath": pagePath,
            "count": {
                "totalPageVisits": {$arrayElemAt: ["$totalCount.count",0]}, 
                "returningUsers": {$arrayElemAt: ["$ReturnUsers.total",0]},
                "totalUsers": {$arrayElemAt: ["$TotalUsers.total",0]}
            },
          }}
    ],
        function( err, data ) {
            if ( err )
            throw err;
        
            res.send(data[0]);
        }); 
  });
 
  module.exports = router;