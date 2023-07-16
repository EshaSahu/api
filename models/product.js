const mongoose = require("mongoose");

const productSchema=mongoose.Schema({
    name: String,
    image:String,
    countInStock:{
        type:Number,
        required:true
    }},{
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeout: 1000
         }  
    })
   
    


exports.Product=mongoose.model('Product', productSchema);   