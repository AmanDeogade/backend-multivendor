const express = require('express');
const Banner = require('../models/banner');
const bannerRoute = express.Router();

//banner from client to server
bannerRoute.post('/api/banner', async (req, res) => {
    try{
        const {image} = req.body; //extract image from the request the client will make
        //req.body contains data send by the client
        const banner = new Banner({
            image});
        await banner.save();
        return res.status(201).send(banner);                 //No need to write return always
    } catch(e){
        res.status(400).json({error: e.message});
    }   
})

bannerRoute.get('/api/banner', async (req, res) => {
    try{
        const banner = await Banner.find();  //get all the banner present in the database
        return res.status(200).send(banner); 
    } catch(e){
        res.status(500).json({error: e.message});
    }
})

module.exports = bannerRoute;