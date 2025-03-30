const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Vendor = require('../models/vendor');

//authentication middleware
//this middleware will check if the user is authenticated or not

const auth = async (req, res, next) => {
    try {
        //extract the token from the header
        const token = req.header('x-auth-token');

        //if no token is provided then return 401(unauthorized) status with an error message
        if(!token){
            return res.status(401).json({ msg: 'No authentication token, authorization denied' });
        }

        //verify the jwt token using the secret key
        const verified = jwt.verified(token, "passwordKey");

        //if the token variation fails then return 401(unauthorized) status with an error message
        if(!verified){
            return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
        }

        //find the normal user or vendor in the database using the id stored in the token payload
        const user = await User.findById(verified.id) || await Vendor.findById(verified.id);

        if(!user){
            return res.status(401).json({ msg: 'User not found , authorization denied',  });
        }
        
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).send({ error:e.message });
    }
};

//vendor authentication middleware
//this middleware will check if the vendor is authenticated or not
//it should be for vendor routes only vendor can access vendor routes

const vendorAuth = async (req, res, next) => {
    try {
        if (!req.user.role || req.user.role !== 'vendor') {
            return res.status(403).json({ msg: 'Access denied, only vendor are allowed' });
        }

        next();
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = { auth, vendorAuth }; // export both at the same time