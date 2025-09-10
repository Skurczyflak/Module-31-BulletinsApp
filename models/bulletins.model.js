const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateOfPost: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    }});

module.exports = mongoose.model('Bulletin', bulletinSchema);