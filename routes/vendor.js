const express = require('express');
const Vendor = require('../models/vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const vendorRouter = express.Router();

vendorRouter.post('/api/vendor/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingEmail = await Vendor.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "Vendor with same email already exists" });
            //error from client bcz they provided email that already exists
        } else {
            //Generate a salt with a const factor 10 
            const salt = await bcrypt.genSalt(10);   //the higher the number the more stronger the password will be & more the time it will take
            //so for industry standards 10 is a good number
            //hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            let vendor = new Vendor({
                fullName,
                email,
                password: hashedPassword
            });
            vendor = await vendor.save();
            res.json({ vendor });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

vendorRouter.post('/api/vendor/sigin', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const finduser = await Vendor.findOne({email});   

        if (!finduser){
            return res.status(400).json({ msg: "vendor with this email does not exist"});
        }
        else{
            const isMatch = await bcrypt.compare(password, finduser.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect password" });
            }else{
                // Generate JWT token
                const token = jwt.sign({ id: finduser._id }, "passwordKey");
                //here _id means mongo id

                // Remove sensitive info
                const { password, ...vendorWithoutPassword } = finduser._doc;
                //saving user info in userWithoutPassword without the password
                //as client should not have access to the password

                // Send the response (Only Once)
                return res.json({ token, vendor:vendorWithoutPassword });
                //exclude the 
            }
        }
    } catch (e){
        res.status(500).json({error: e.message});
    }
});

vendorRouter.get('/api/vendor', async (req,res)=>{
    try{
        const vendors = await Vendor.find().select('-password'); //Exclude password field
        return res.status(200).json(vendors);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})

module.exports = vendorRouter;