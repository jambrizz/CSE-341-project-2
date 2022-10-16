//This file is for API documentation using swagger-ui-express

//variable called router to require the express module
const router = require('express').Router();

//variable called swaggerUi to require the swagger-ui-express module
const swaggerUi = require('swagger-ui-express');

//variable called swaggerDocument to require the swagger-output.json file
const swaggerDocument = require('../swagger-output.json');

//route to the swagger documentation
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//exports the router module
module.exports = router;