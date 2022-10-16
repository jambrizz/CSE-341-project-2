//This file is to view/create/update/delete inventory from MongoDB

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to pass an ObjectId to retrieve data from MongoDB
const ObjectId = require('mongodb').ObjectId;

//This variable is to retrieve all inventory from MongoDB
const getAllInventory = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve all inventory from database'
    const result = await mongodb.getDb().db('project2').collection('inventory').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(lists);
    });
};

//This variable is to retrieve an individual inventory item from MongoDB
const getItem = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve an single inventory item from database'
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('inventory').find({_id: id});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//This variable is to create a new inventory item in MongoDB
const createNewItem = async (req, res, next) => {
    // #swagger.description = 'This is to create a new inventory item in database'
    const createItem = {
        productName: req.body.productName,
        sku: req.body.sku,
        genre: req.body.genre,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    const response = await mongodb.getDb().db('project2').collection('inventory').insertOne(createItem);
    if (response.acknowledged) {
        res.status(201);
        res.json({ _id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'There was an error creating the new inventory item');
    }
};

//This variable is to update an inventory item in MongoDB
const updateItem = async (req, res) => {
    // #swagger.description = 'This is to update an inventory item in the database'
    const id = new ObjectId(req.params.id);
    const item = {
        productName: req.body.productName,
        sku: req.body.sku,
        genre: req.body.genre,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    const response = await mongodb.getDb().db('project2').collection('inventory').replaceOne({_id: id}, item);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error updating the inventory item');
    }
};

//This variable is to delete an inventory item from MongoDB
const deleteItem = async (req, res) => {
    // #swagger.description = 'This is to delete an inventory item from the database'
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project2').collection('inventory').remove({ _id: id }, true);
    console.log(response);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error deleting the inventory item');
    }
};

//export the module
module.exports = {
    getAllInventory,
    getItem,
    createNewItem,
    updateItem,
    deleteItem
};