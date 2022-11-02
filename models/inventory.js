//This file is for inventory validation
const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    productName: {
        type: String,  
        lowercase: true, 
        trim: true, 
        required: true
    },
    sku: {
        type: Number, 
        required: true
    },
    genre: {
        type: String,  
        lowercase: true, 
        trim: true,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number,  
        min: 0,
        required: true
    },

},
{
    collection: 'inventory'
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;