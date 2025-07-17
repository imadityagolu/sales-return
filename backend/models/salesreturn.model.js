const mongoose = require('mongoose');

const salesreturnSchema = new mongoose.Schema({
    customerName: {
        type: String,
        require: true
    },
    date:{
        type:Date,
        require: true
    },
    reference:{
        type:String,
        require: true
    },
    productName:{
        type:String,
        require: true
    },
    grandTotal:{
        type:Number,
        require: true
    },
    orderTax:{
        type:Number,
        require: true
    },
    orderDiscount:{
        type:Number,
        require: true
    },
    shipping:{
        type:Number,
        require: true
    },
    returnstatus:{
        type:String,
        require: true
    },
    paid:{
        type:Number,
        default: 0
    },
    due:{
        type:Number,
        default: 0
    },
    paymentstatus:{
        type:String
    }
});

const salesreturnModel = mongoose.model("Return", salesreturnSchema);

module.exports = salesreturnModel;