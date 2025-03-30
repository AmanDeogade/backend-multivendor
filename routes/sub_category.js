const express = require('express');
const SubCategory = require('../models/sub_category');
const SubCategoryRoute = express.Router();

SubCategoryRoute.post('/api/subCategory', async (req, res) => {
    try{
        const {categoryId, categoryName, images, subCategoryName} = req.body; //extract image from the request the client will make
        //req.body contains data send by the client
        const subCategory = new SubCategory({  //object-> subCategory //class ->SubCategory
            categoryId,
            categoryName,
            images,
            subCategoryName
        });
        await subCategory.save();
        return res.status(201).send(subCategory);
    } catch(e){
        res.status(400).json({error: e.message});
    }
})

SubCategoryRoute.get('/api/subCategory', async (req, res) => {
    try {
        const subcategory = await SubCategory.find();  //get all the banner present in the database
        return res.status(200).send(subcategory); 
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

SubCategoryRoute.get('/api/category/:categoryName/subcategories', async (req, res) => {   //categoryName is a parameter 
    //based on category name get all the subcategories  
    try{
        //extract the categoryName from the request URL using Destructing
        const { categoryName } = req.params;
        const subcategories = await SubCategory.find({ categoryName: categoryName });

        //check if any subcategory found
        if (subcategories.length > 0) {
            return res.status(200).send(subcategories);
        } else {
            return res.status(404).json({ msg: "No subcategories found for the given category name" });
        }
    } catch(e){
        res.status(500).json({error: e.message});
    }
})

module.exports = SubCategoryRoute;