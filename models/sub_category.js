const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    images : {
        type: String,
        required: true
    },

    subCategoryName: {
        type: String,
        required: true
    },
});

const subCategory = mongoose.model('subCategory', subCategorySchema); //create model

module.exports = subCategory;