const express = require('express');
const ProductReview = require('../models/product_review');
const productReviewRoute = express.Router();

productReviewRoute.post('/api/product-review', async (req, res) => {
    try{
        const {buyerId, email, fullName, ProductId, rating, review} = req.body; //extract image from the request the client will make
        //req.body contains data send by the client
        const reviews = new ProductReview({
            buyerId,
            email,
            fullName,
            ProductId,
            rating,
            review
        });
        await reviews.save();
        return res.status(201).send(reviews);
    } catch(e){
        res.status(500).json({error: e.message});
    }   
});

productReviewRoute.get('/api/product-review', async (req, res) => {
    try{
        const reviews = await ProductReview.find();  //get all the banner present in the database
        return res.status(200).json(reviews); 
    } catch(e){
        res.status(500).json({"error": e.message});
    }
})

module.exports = productReviewRoute;
