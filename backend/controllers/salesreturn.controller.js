const salesreturnModel = require('../models/salesreturn.model');

const returnproduct = async(req, res) => {

    try{
    const { customerName, date, reference, productName, grandTotal, orderTax, orderDiscount, shipping, returnstatus } = req.body;

        if (!customerName || !date || !reference || !productName || !grandTotal || !orderTax || !orderDiscount || !shipping || !returnstatus) {
            return res.status(400).json({ error: "Enter all the fields" });
        }

        let paid = 0;
        let due = 0;
        if (returnstatus === "Received") {
            paid = grandTotal;
            due = 0;
            paymentstatus = "Paid"
        } else if (returnstatus === "Pending") {
            paid = 0;
            due = grandTotal;
            paymentstatus = "Unpaid"
        }

        const returndetails = await salesreturnModel.create({ customerName, date, reference, productName, grandTotal, orderTax, orderDiscount, shipping, returnstatus, paid, due, paymentstatus });

        res.status(200).json({ alert: "Sales Return Added", returndetails });
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const listsalesreturn = async(req, res) => {
    try {
    const salesreturnlist = await salesreturnModel.find().sort({ date: -1 });
    res.status(200).json(salesreturnlist)
    } catch(error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const deletesalesreturn = async(req, res) => {
  try {
    await salesreturnModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ alert: "Sales Return Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const importSalesReturnCSV = async (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No data provided.' });
    }
    const requiredFields = [
      'customerName', 'date', 'reference', 'productName', 'grandTotal', 'orderTax', 'orderDiscount', 'shipping', 'returnstatus'
    ];
    // Validate all rows
    for (const row of data) {
      for (const field of requiredFields) {
        if (!(field in row) || row[field] === '') {
          return res.status(400).json({ error: `Missing field ${field} in one or more rows.` });
        }
      }
    }
    // Prepare documents (add paid, due, paymentstatus logic)
    const docs = data.map(row => {
      let paid = 0;
      let due = 0;
      let paymentstatus = '';
      if (row.returnstatus === 'Received') {
        paid = row.grandTotal;
        due = 0;
        paymentstatus = 'Paid';
      } else if (row.returnstatus === 'Pending') {
        paid = 0;
        due = row.grandTotal;
        paymentstatus = 'Unpaid';
      }
      return {
        ...row,
        paid,
        due,
        paymentstatus
      };
    });
    await salesreturnModel.insertMany(docs);
    res.status(200).json({ alert: 'Sales returns imported successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const salesreturnController = {
    returnproduct,
    listsalesreturn,
    deletesalesreturn,
    importSalesReturnCSV
};

module.exports = salesreturnController;