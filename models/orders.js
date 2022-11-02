//This file is for order validation
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    clientId: {
        type: String,  
        trim: true,
        required: true
    },
    sku: {
        type: Number, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true, 
        min: 1
    },
    total: {
        type: Number, 
        required: true
    },
},
{
    collection: 'orders'
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;