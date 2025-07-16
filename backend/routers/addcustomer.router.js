const express = require('express');
const router = express.Router();

const {
    addCustomer,
    list
} = require('../controllers/addcustomer.controller');

router.post("/add", addCustomer);
router.get("/list", list);

module.exports = router;