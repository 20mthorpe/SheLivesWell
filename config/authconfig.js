
const dotenv = require('dotenv');
dotenv.config();

//const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.JWT_SECRET,
  baseURL: 'http://localhost:8080',
  clientID: '8rCYgHCkPjTsyzXV28sLcuEWyCQvJVKk',
  issuerBaseURL: 'https://dev-tj1077np00zro76f.us.auth0.com'
};

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

module.exports = { config };
