const express= require("express");
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const morgan= require("morgan");
const cors=require("cors");
const app=express();

require("dotenv/config");
const api=process.env.API_URL;

const productsRouter=require("./routers/products.js");

app.use(express.json());
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());
 app.use(morgan("tiny"));

 app.use(cors());
 app.options('*', cors());

 app.use(bodyParser.urlencoded({extended: true}));

 app.use("/products", productsRouter);

// const {Product} = require("./models/product.js");

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    dbName:'api_database'
    })
    .then(()=>{
        console.log('Database connection is ready...')
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(process.env.PORT || 8000, function(){
  
    console.log("Server running at port 8000");
});