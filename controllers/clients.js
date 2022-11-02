//This file is to request/create/update/delete client from MongoDB

//variable to require the express module
const express = require('express');

//This variable to require mongodb
const mongodb = require('../db/connection');

//This variable is to use the schema in mondels
const Client = require('../models/clients');

//This variable is to retrieve all clients from MongoDB
const getAllClients = async (req, res) => {
    // #swagger.description = 'This is to retrieve all clients from database'
    try {
        const result = await Client.find().where('clients').all();
        res.json(result);
    } catch(error) {
        console.log(error);
    }
};

const getSingleClient = async(req, res) => {
    // #swagger.description = 'This is to retrieve a single client from the database'
    try{
        const userEmail = req.params.email;
        const result = await Client.find({email: userEmail});
        res.json(result);
    } catch(error){
        console.log(error);
    }
};

//This variable is to create a new client in MongoDB
const createNewClient = async (req, res, next) => {
    // #swagger.description = 'This is to create a new client in database'
    try {
        const createClient = await Client.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telephone: req.body.telephone,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        });
        res.status(201).json(createClient);
    } catch(error){
        next(res.status(400).json(error));
    }
};
//This variable is to update a client in MongoDB
const updateClient = async (req, res, next) => {
    // #swagger.description = 'This is to update a client in the database'
    try {
        const id = req.params.id;
        const updateClient = await Client.updateOne({_id: id}, {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            telephone: req.body.telephone,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        }});
        res.status(200).json(updateClient);
    } catch(error){
        next(res.status(400).json(error));
    }
};

//This variable is to delete a client in MongoDB
const deleteClient = async (req, res, next) => {
    // #swagger.description = 'This is to delete a client in the database'
    try {
        const deleteClient = await Client.deleteOne({_id: req.params.id});
        res.status(200).json(deleteClient);
    } catch(error) {
        next(res.status(500).json(error));
    }
};

module.exports = {
    getAllClients,
    getSingleClient,
    createNewClient,
    updateClient,
    deleteClient
};