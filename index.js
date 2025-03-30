//import the express module
const express = require('express');
// const helloRoute = require('./routes/hello');
const mongoose = require('mongoose');   
const authRouter = require('./routes/auth');
const bannerRoute = require('./routes/banner');
const categoryRoute = require('./routes/category');
const subCategoryRoute = require('./routes/sub_category');
const productRoute = require('./routes/product');
const productReviewRoute = require('./routes/product_review');
const vendorRouter = require('./routes/vendor');
const orderRouter = require('./routes/order');
const cors = require('cors');

//Defind the port number the server will listen to
const PORT = 3000;

//create a instance of express application
//because it give us the starting point
const app = express();
//mongoDb string
const DB = "mongodb+srv://aman:aman4444@cluster0.9ua9n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(bannerRoute);
app.use(categoryRoute);
app.use(subCategoryRoute);
app.use(productRoute);
app.use(productReviewRoute);
app.use(vendorRouter);
app.use(orderRouter);

//middleware to register or mount routes
// app.use(helloRoute);

mongoose.connect(DB).then(()=>{
    console.log("MongoDB connection successful");
})

//start the server
app.listen(PORT,"0.0.0.0",function(){
    //LOG the number
    console.log(`Server is running on port ${PORT}`);
});

//define a route
//endpoint
//req allow to acces data send by client
//res allow to send data back to client
// app.get('/hello',(req,res)=>{
//     res.send("Hello World");
// })