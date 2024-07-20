// layer untuk handle request dan response
// dan validasi body
const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./product.services");
console.log(prisma);

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await addProduct(newProductData);
    res.send(product);
  } catch (error) {
    res.status(500).send(error.message);
    tus(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;
  // Validate input
  if (
    !productData.name ||
    !productData.description ||
    !productData.price ||
    !productData.image
  ) {
    return res.status(400).send({
      message: "Missing required fields",
      statusCode: 400,
    });
  }
  const product = await updateProduct(productId, productData);
  res.status(200).send({ data: product, message: "Updated", statusCode: 200 });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    await updateProduct(parseInt(productId), productData);
    res.status(200).send("Product patched successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProduct(parseInt(productId));
    res.send("Product deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
