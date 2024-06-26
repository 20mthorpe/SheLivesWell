const express = require('express');
const router = new express.Router();
const { auth } = require('express-openid-connect');

router.get('/', (req, res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});