const productModle = require('../models/products.model');

const listproduct = async(req, res) => {
    try{
        const products = await productModle.find();
        res.status(200).json(products);
    } catch(error) {
        res.status(400).json({ 
            error: error.message
        });
    }
}

const productController = {
    listproduct
};

module.exports = productController;