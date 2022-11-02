//This file is to designate the routes for the app

//variable to require the express module
const express = require('express');

//variable to require the router module
const router = express.Router();

//variable to require the clients controller
const inventoryController = require('../controllers/inventory');

//Get all inventory
router.get('/', inventoryController.getAllInventory);

//Get an individual inventory item
router.get('/:sku', inventoryController.getItem);

//Post a new inventory item
router.post('/', inventoryController.createNewItem);

//Update an inventory item
router.put('/:id', inventoryController.updateItem);

//Delete an inventory item
router.delete('/:id', inventoryController.deleteItem);

//exports the router module
module.exports = router;