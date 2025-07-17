const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:Number
    },
    qty:{
        type:Number
    },
    discount:{
        type:Number
    },
    tax:{
        type:Number
    }
});

const productModle = mongoose.model("Products", productSchema);

module.exports = productModle;