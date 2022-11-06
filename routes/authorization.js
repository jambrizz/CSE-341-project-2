//This file is to handle the authorization of the user

//This variable is to require the express module
const express = require('express');

//This variable is to require the router module
const router = express.Router();

//This variable is to require the authorization controller
const authorizationController = require('../controllers/authorization');

//This route is to handle the login of the user
router.get('/login', authorizationController.login);

router.get('/callback', authorizationController.callback);

module.exports = router;