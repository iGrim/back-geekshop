var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    genre: {
        type: String,
    },
    country: {
        type: String,
    },
    director: {
        type: String,
    },
    actors: {
        type: String,
    },
    cover: {
        type: String,
    },
});
var items = new mongoose.model('Items', schema);
module.exports = items;