const express = require('express');
const router = express.Router();

const {
    returnproduct,
    listsalesreturn,
    deletesalesreturn
} = require('../controllers/salesreturn.controller');

router.post("/return", returnproduct);
router.get("/listsalesreturn", listsalesreturn);
router.delete("/delete/:id", deletesalesreturn);

module.exports = router;
