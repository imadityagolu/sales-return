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

const salesreturnController = {
    returnproduct,
    listsalesreturn,
    deletesalesreturn
};

module.exports = salesreturnController;