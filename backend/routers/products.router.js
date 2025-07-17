const express = require('express');
const router = express.Router();

const {
    listproduct
} = require('../controllers/products.controller');

router.get("/listproducts", listproduct);

module.exports = router;