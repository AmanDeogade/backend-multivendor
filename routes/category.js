const express = require('express');
const Category = require('../models/category');
const categoryRoute = express.Router();

categoryRoute.post('/api/categories', async (req, res) => {
    try{
        const {name, image, banner} = req.body; //extract image from the request the client will make
        //req.body contains data send by the client
        const category = new Category({
            name,
            image,
            banner
        });
        await category.save();
        return res.status(201).send(category);
    } catch(e){
        res.status(400).json({error: e.message});
    }   
})

categoryRoute.get('/api/categories', async (req, res) => {
    try{
        const category = await Category.find();  //get all the banner present in the database
        return res.status(200).send(category);    //it is sending response in a map containing array not json
    } catch(e){
        res.status(500).json({error: e.message});
    }
})

module.exports = categoryRoute;