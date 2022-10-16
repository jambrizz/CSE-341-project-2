//This file is for the API documentation using swagger

//import swagger-jsdoc
const swaggerAutogen = require('swagger-autogen')();

//varaible called doc for swagger
const doc = {
    info: {
        title: 'Clients API',
        description: 'This is the list of clients for the store',
    },
    host: 'localhost:3000',
    schemas: ['http'],
};

//outpur file for swagger
const outputFile = 'swagger-output.json';

//input file for swagger
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);