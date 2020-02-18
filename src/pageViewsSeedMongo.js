const faker = require("faker");
const config = require('../config');
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(config.mongo.host, function(err, client) {

  const db = client.db(config.mongo.dbName);

  const pageViewsCollection = db.collection(config.mongo.collectionName);

	let userViewsCount = faker.random.number({
							'min': 2,
							'max': 8
						});
		
	let views = [];
	
	for (let i = 0; i < 20; i += 1) {
	  var userId = faker.random.alphaNumeric(7);
	  let browser = faker.random.arrayElement(["Internet Explorer", "Chrome", "Firefox"]);
	  let userLocale = faker.random.locale();
	  for (let i = 0; i < userViewsCount; i += 1) {
		let view = {
				hostName: "localhost",
				pagePath: faker.random.arrayElement(["/home", "/search", "/details", "/blog"]),
				requestTime: faker.random.number({
									'min': 1580601600000,
									'max': 1581813429607
									}),
				browser,
				userId,
				country: userLocale,
				sessionId: userId,
			
		};
		 views.push(view);
	  }
	}

  pageViewsCollection.insertMany(views);
  console.log("Database seeded!");
  client.close();
});
