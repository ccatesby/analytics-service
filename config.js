var config = {};

config.mongo = 
	{
		host: "mongodb://localhost:27017",
		dbName: "analytics",
		collectionName: "pageviews"
	};

module.exports = config;