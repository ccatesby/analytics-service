Node api service that collects view data and serves aggregated view data via authenicated endpoint. 

To run:

change mongo connection details within: config.js (no authentication).
cd src
npm install
node pageViewsSeedMongo.js
node app.js.

To Use:
Get Bearer Token from 
http://localhost:3000/api/login

use non authicated paths to log user activity.
eg:
http://localhost:3000/api/home
