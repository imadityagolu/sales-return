const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        require: true
    }
});

const customerModel = mongoose.model("Customers", customerSchema);

module.exports = customerModel;