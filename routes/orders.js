//This file is to designate the routes for the app

//variable to require the express module
const express = require('express');

//variable to require the router module
const router = express.Router();

//variable to require the clients controller
const orderController = require('../controllers/orders');

//Get all orders
router.get('/', orderController.getAllOrders);

//Get an individual order
router.get('/:id', orderController.getSingleOrder);

//Post a new order
router.post('/', orderController.createNewOrder);

//Update an order
router.put('/:id', orderController.updateOrder);

//Delete an order
router.delete('/:id', orderController.deleteOrder);

//exports the router module
module.exports = router;