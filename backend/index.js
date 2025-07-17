const express = require("express");
const app = express();
require('dotenv/config');
const cors = require("cors");
const mongoose = require("mongoose");
const customerRouter = require('./routers/addcustomer.router');
const productRouter = require('./routers/products.router');
const salesRouter = require('./routers/salesreturn.router');

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is up at - http://localhost:${PORT}`));
app.use(express.json());
app.use(cors());
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGOODB_URL)
.then(() => {console.log(`Database connected`);})
.catch((error) => {console.log(error);});

app.use("/api/customer", customerRouter);
app.use("/api/products", productRouter);
app.use("/api/sales", salesRouter);
