const express = require('express');
const router = express.Router();

const {
    returnproduct,
    listsalesreturn,
    deletesalesreturn,
    importSalesReturnCSV
} = require('../controllers/salesreturn.controller');

router.post("/return", returnproduct);
router.get("/listsalesreturn", listsalesreturn);
router.delete("/delete/:id", deletesalesreturn);
router.post("/import-csv", importSalesReturnCSV);

module.exports = router;
