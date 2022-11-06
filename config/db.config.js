const dotenv = require('dotenv');

dotenv.config();

module.exports = {
   uri: process.env.MONGODB_URI,
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   authorizationHost: process.env.AUTHORIZATION_HOST,
   redirectUri: process.env.REDIRECT_URI 
};