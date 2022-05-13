var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        default: ''
    },
    anime: {
        type: String,
        default: ''
    }
});
var items = new mongoose.model('Items', schema);
module.exports = items;