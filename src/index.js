const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Hello world");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProducts = req.body;

  try {
    const products = await prisma.product.create({
      data: {
        name: newProducts.name,
        description: newProducts.description,
        price: newProducts.price,
        image: newProducts.image,
      },
    });
    res.send({
      data: newProducts,
      message: "Product created successfully",
      statusCode: 201,
    });
  } catch (error) {
    res.send({
      message: "Failed to create product",
      statusCode: 500,
      error: error.message,
    });
  }
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  // Validate productId
  if (isNaN(parseInt(productId))) {
    return res.status(400).send({
      message: "Invalid product ID",
      statusCode: 400,
    });
  }

  // Validate input
  const { name, description, price, image } = updatedProduct;
  if (!name || !description || !price || !image) {
    return res.status(400).send({
      message: "Missing required fields",
      statusCode: 400,
    });
  }

  try {
    const product = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name,
        description,
        price,
        image,
      },
    });

    console.log(product);

    res.status(200).send({
      data: product,
      message: "Product updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update product",
      statusCode: 500,
      error: error.message,
    });
  }
});

app.patch("/products:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const { name, description, price, image } = updatedProduct;

  try {
    const product = await prisma.product.update({
      where: {
        id: parseInt(productId),
      },
      data: {
        name,
        description,
        price,
        image,
      },
    });

    console.log(product);

    res.status(200).send({
      data: product,
      message: "Product updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to update product",
      statusCode: 500,
      error: error.message,
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    await prisma.product.delete({
      where: {
        id: parseInt(productId),
      },
    });
    res.send({
      message: "Product deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.send({
      message: "Failed to delete product",
      statusCode: 500,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("express API RUNNING in port : " + PORT);
});
