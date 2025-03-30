//Buyers

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter  = express.Router();
const jwt = require('jsonwebtoken');


authRouter.post('/api/signup', async (req,res)=>{
    try {
        const {fullName, email , password} = req.body;

    const existingEmail = await User.findOne({email});
        if (existingEmail){
            return res.status(400).json({msg:"user with same email already exists"});
            //error from client bcz they provided email that already exists
        } else{
            //Generate a salt with a const factor 10 
            const salt = await bcrypt.genSalt(10);
            //hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = new User({
                fullName,
                email,
                password: hashedPassword
            });
            user = await user.save();
            res.json({user});
        }
    } catch (e){
        res.status(500).json({error: e.message});
    }
});

authRouter.post('/api/sigin', async (req,res)=>{
    try {
        const {email, password} = req.body;
        const finduser = await User.findOne({email});   

        if (!finduser){
            return res.status(400).json({msg: "user with this email does not exist"});
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
                const { password, ...userWithoutPassword } = finduser._doc;
                //saving user info in userWithoutPassword without the password
                //as client should not have access to the password

                // Send the response (Only Once)
                return res.json({ token,user:userWithoutPassword });
                //exclude the 
            }
        }
    } catch (e){
        res.status(500).json({error: e.message});
    }
});

//put route for updating user's state, city and locality

authRouter.put('/api/user/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const {state, city, locality} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id, { state, city, locality },
        {new: true});

        if(!updatedUser){
            return res.status(404).json({msg: "user with this id does not exist"});
        }
        return res.status(200).json(updatedUser);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})  

 authRouter.get('/api/user', async (req,res)=>{
    try{
        const users = await User.find().select('-password'); //Exclude password field
        return res.status(200).json(users);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})


module.exports = authRouter;