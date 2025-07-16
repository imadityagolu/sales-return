const customerModel = require('../models/addcustomer.model');

const addCustomer = async(req, res) => {

    try{
    const customerName = await customerModel.create({ customerName : req.body.addCustomerName });
    res.status(200).json({
        alert: "Customer Added", customerName
    });
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const list = async(req, res) => {
    try {
    const listCustomers = await customerModel.find();
    res.status(200).json(listCustomers)
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const customerController = {
    addCustomer,
    list
};

module.exports = customerController;