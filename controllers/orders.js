//This file is to request/create/update/delete orders from MongoDB

//variable to require the express module
const express = require('express');

//This variable is to use the schema in models
const Order = require('../models/orders');

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to retrieve all orders from MongoDB
const getAllOrders = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve all orders from database'
    try {
        const result = await Order.find().where('orders').all();
        res.json(result);
    } catch(error){
        next(res.status(500).json(error))
    }
};

//This variable is to retrieve a single order from MongoDB
const getSingleOrder = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve a single order from the database'
    try {
        const id = req.params.id;
        const result = await Order.findById(id);
        res.json(result);
    } catch(error){
        next(res.status(400).json(error));
    }
};

//This variable is to create a new order in MongoDB
const createNewOrder = async (req, res, next) => {
    // #swagger.description = 'This is to create a new order in the database'
    try {
        const createOrder = await Order.create({
            clientId: req.body.clientId,
            sku: req.body.sku,
            price: req.body.price,
            quantity: req.body.quantity,
            total: req.body.total
        });
        res.status(201).json(createOrder);
    } catch(error){
        next(res.status(400).json(error));
    }
};

//This variable is to update an order in MongoDB
const updateOrder = async (req, res, next) => {
    // #swagger.description = 'This is to update an order in the database'
    try{
        const id = req.params.id;
        const updateOrder = await Order.updateOne({_id: id}, {$set: {
            clientId: req.body.clientId,
            sku: req.body.sku,
            price: req.body.price,
            quantity: req.body.quantity,
            total: req.body.total
        }});
        res.status(201).json(updateOrder);
    } catch(error){
        next(res.status(400).json(error));
    }
};

//This variable is to delete an order from MongoDB
const deleteOrder = async (req, res, next) => {
    // #swagger.description = 'This is to delete an order from the database'
    try{
        const id = req.params.id;
        const deleteOrder = await Order.deleteOne({_id: id});
        res.status(200).json(deleteOrder);
    } catch(error){
        next(res.status(500).json(error));
    }
};

//This is to export the modules
module.exports = {
    getAllOrders,
    getSingleOrder,
    createNewOrder,
    updateOrder,
    deleteOrder
};