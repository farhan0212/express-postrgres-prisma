const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log("express API RUNNING in port : " + PORT);
});
