//This file is to request/create/update/delete client from MongoDB

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to pass an ObjectId to retrieve data from MongoDB
const ObjectId = require('mongodb').ObjectId;

//This variable is to retrieve all clients from MongoDB
const getAllClients = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve all clients from database'
    const result = await mongodb.getDb().db('project2').collection('clients').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//This variable is to retrieve a single client from MongoDB
const getSingleClient = async(req, res, next) => {
    // #swagger.description = 'This is to retrieve a single client from database'
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('clients').find({_id: id});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//This variable is to create a new client in MongoDB
const createNewClient = async (req, res) => {
    // #swagger.description = 'This is to create a new client in database'
    const createClient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    };
    const response = await mongodb.getDb().db('project2').collection('clients').insertOne(createClient);
    if (response.acknowledged) {
        res.status(201);
        res.json({ _id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'There was an error creating the new client');
    }
};

//This variable is to update a client in MongoDB
const updateClient = async (req, res) => {
    // #swagger.description = 'This is to update a client in the database'
    const id = new ObjectId(req.params.id);
    const client = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        telephone: req.body.telephone,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
    };
    const response = await mongodb.getDb().db('project2').collection('clients').replaceOne({ _id: id }, client);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error updating the client');
    }
};

//This variable is to delete a client in MongoDB
const deleteClient = async (req, res) => {
    // #swagger.description = 'This is to delete a client in the database'
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('project2').collection('clients').remove({ _id: id}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'There was an error deleting the client');
    }
};

module.exports = {
    getAllClients,
    getSingleClient,
    createNewClient,
    updateClient,
    deleteClient
};