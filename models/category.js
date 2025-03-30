const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    banner : {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema); //create model
module.exports = Category;