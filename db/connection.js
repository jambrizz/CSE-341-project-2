//This file is to establish connection to the database

//variable to retrieve database login from .env file
const dotenv = require('dotenv');
dotenv.config();

//require mongodb
const {MongoClient} = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }
    //process.env.MONGODB_URI is the connection string
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized!');
    }
    return _db;
};

//export the functions
module.exports = {
    initDb,
    getDb
};