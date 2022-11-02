//This is file is for client validation
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,  
        lowercase: true, 
        trim: true,
        required: true
    },
    lastName: {
        type: String, 
        lowercase: true, 
        trim: true,
        required: true
    },
    email: {
        type: String, 
        lowercase: true, 
        trim: true,
        required: true,
    },
    telephone: {
        type: Number, 
        required: true
    },
    address1: {
        type: String,  
        lowercase: true, 
        trim: true,
        required: true
    },
    address2: {
        type: String,  
        lowercase: true, 
        trim: true,
        required: false
    },
    city: {
        type: String,  
        lowercase: true, 
        trim: true,
        required: true
    },
    state: {
        type: String, 
        uppercase: true, 
        trim: true,
        required: true
    },
    zipcode: {
        type: Number, 
        required: true
    },
}, 
{
    collection: 'clients'
});

let Client = mongoose.model('Client', clientSchema);

module.exports = Client;