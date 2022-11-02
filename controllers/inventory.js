//This file is to view/create/update/delete inventory from MongoDB

//variable to require the express module
const express = require('express');

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to use the schema in models
const Inventory = require('../models/inventory');

//This variable is to pass an ObjectId to retrieve data from MongoDB
const ObjectId = require('mongodb').ObjectId;

//This variable is to retrieve all inventory from MongoDB
const getAllInventory = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve all inventory from database'
    try {
        const result = await Inventory.find().where('inventory').all();
        res.status(200).json(result);
    } catch(error) {
        next(res.status(500).json(error));
    }
};

//This variable is to retrieve an individual inventory item from MongoDB
const getItem = async(req, res) => {
    // #swagger.description = 'This is to retrieve an single inventory item from database'
    try {
        const skuNo = req.params.sku;
        const result = await Inventory.where({sku: skuNo}).find();
        res.status(200).json(result);
    } catch(error) {
        res.status(400).json(error);
    }
};

//This variable is to create a new inventory item in MongoDB
const createNewItem = async (req, res, next) => {
    // #swagger.description = 'This is to create a new inventory item in database'
    try{
        const createItem = await Inventory.create({
            productName: req.body.productName,
            sku: req.body.sku,
            genre: req.body.genre,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        res.status(201).json(createItem);
    } catch(error){
        next(res.status(400).json(error));
    }
};

//This variable is to update an inventory item in MongoDB
const updateItem = async (req, res, next) => {
    // #swagger.description = 'This is to update an inventory item in the database'
    try{
        const id = req.params.id;
        const updateItem = await Inventory.updateOne({_id: id}, {$set: {
            productName: req.body.productName,
            sku: req.body.sku,
            genre: req.body.genre,
            price: req.body.price,
            quantity: req.body.quantity,
        }});
        res.status(201).json(updateItem);
    } catch(error) {
        next(res.status(400).json(error));
    }
};

//This variable is to delete an inventory item from MongoDB
const deleteItem = async (req, res, next) => {
    // #swagger.description = 'This is to delete an inventory item from the database'
    try {
        const id = req.params.id;
        const deleteProduct = await Inventory.deleteOne({_id: id});
        res.status(200).json(deleteProduct);
    } catch(error){
        next(res.status(500).json(error))
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