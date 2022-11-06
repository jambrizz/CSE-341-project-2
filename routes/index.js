//This file is to direct the routes to the correct files

//variable to require the express module
const express = require('express');
const { append } = require('vary');

//variable to require the router module
const router = express.Router();

//This variable is to require the authorization file
const authorizationRoutes = require('./authorization');

//route to the clients folder
router.use('/clients', require('./clients'));
//route to the inventory folder
router.use('/inventory', require('./inventory'));
//route to the orders folder
router.use('/orders', require('./orders'));
//route to the swagger documentation
router.use('/api-docs', require('./docs'));
//route to the authorization file
router.use('/authorization', authorizationRoutes);

//exports the router module
module.exports = router;