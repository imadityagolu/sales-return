const express = require("express");
const app = express();
require('dotenv/config');
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is up at - http://localhost:${PORT}`));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOODB_URL)
.then(() => {console.log(`Database connected`);})
.catch((error) => {console.log(error);});