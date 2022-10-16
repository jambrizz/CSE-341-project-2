//This file is to direct the routes to the correct files

//variable to require the express module
const express = require('express');

//variable to require the router module
const router = express.Router();

//route to the clients folder
router.use('/clients', require('./clients'));
//route to the inventory folder
router.use('/inventory', require('./inventory'));
//route to the orders folder
router.use('/orders', require('./orders'));
//route to the swagger documentation
router.use('/api-docs', require('./docs'));


//exports the router module
module.exports = router;