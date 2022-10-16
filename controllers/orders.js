//This file is to request/create/update/delete orders from MongoDB

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to pass an ObjectId
const ObjectId = require('mongodb').ObjectId;

//This variable is to retrieve all orders from MongoDB
const getAllOrders = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve all orders from database'
    const result = await mongodb.getDb().db('project2').collection('orders').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//This variable is to retrieve a single order from MongoDB
const getSingleOrder = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve a single order from the database'
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('orders').find({_id: id});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//This variable is to create a new order in MongoDB
const createNewOrder = async (req, res) => {
    // #swagger.description = 'This is to create a new order in the database'
    const createOrder = {
        clienId: req.body.clientId,
        sku: req.body.sku,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.total,
    };
    const response = await mongodb.getDb().db('project2').collection('orders').insertOne(createOrder);
    if (response.acknowledged) {
        res.status(201);
        res.json({ _id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'There was an error creating the new order');
    }
};

//This variable is to update an order in MongoDB
const updateOrder = async (req, res) => {
    // #swagger.description = 'This is to update an order in the database'
    const id = new ObjectId(req.params.id);
    const order = {
        clienId: req.body.clientId,
        sku: req.body.sku,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.total,
    };
    const response = await mongodb.getDb().db('project2').collection('orders').replaceOne({ _id: id }, order);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error updating the order');
    }
};

//This variable is to delete an order from MongoDB
const deleteOrder = async (req, res) => {
    // #swagger.description = 'This is to delete an order from the database'
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project2').collection('orders').remove({ _id: id}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error deleting the order');
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