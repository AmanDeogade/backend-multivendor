const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        trim : true,
        validate : {
            validator: (value) => {
                const result = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return result.test(value);
            },
            message : "Please Enter Valid Email Adress" 
        }
    },
    state: {
        type: String,
        default: "",
    }, 
    city: {
        type: String,
        default: "",
    },
    locality: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                //check if password is at least 8 char
                return value.length >=8;
            },
            message: "Password must be at least 8 char"
        }
    }
});

const User = mongoose.model("User",userSchema);
//collection name 'user' in MongoDB is coming from here

module.exports = User;