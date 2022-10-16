//This file is to designate the routes for the app

//variable to require the express module
const express = require('express');

//variable to require the router module
const router = express.Router();

//variable to require the clients controller
const clientsController = require('../controllers/clients');

//Get all clients
router.get('/', clientsController.getAllClients);

//Get an individual client
router.get('/:id', clientsController.getSingleClient);

//Post a new client
router.post('/', clientsController.createNewClient);

//Update a client
router.put('/:id', clientsController.updateClient);

//Delete a client
router.delete('/:id', clientsController.deleteClient);

//exports the router module
module.exports = router;